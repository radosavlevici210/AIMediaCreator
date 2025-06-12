import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertExportSchema, insertSecurityLogSchema } from "@shared/schema";
import { z } from "zod";
import rateLimit from "express-rate-limit";

// Security middleware - more permissive for development
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 100, // Higher limit for development
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks and certain endpoints in development
    if (process.env.NODE_ENV === 'development' && req.path === '/health') {
      return true;
    }
    return false;
  }
});

const projectLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: process.env.NODE_ENV === 'development' ? 50 : 10, // Higher limit for development
  message: { error: "Project creation rate limit exceeded" },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply security middleware
  app.use("/api", apiLimiter);

  // Input validation middleware
  const validateInput = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ 
            error: "Validation failed", 
            details: error.errors 
          });
        }
        return res.status(400).json({ error: "Invalid input" });
      }
    };
  };

  // Create a new project
  app.post("/api/projects", projectLimiter, validateInput(insertProjectSchema), async (req, res) => {
    try {
      const projectData = req.body;
      const project = await storage.createProject(projectData);
      
      // Log project creation for security monitoring
      await storage.logSecurityEvent({
        projectId: project.id,
        suspicious_user: req.ip || 'unknown',
        action: 'project_created',
        ip_address: req.ip,
        user_agent: req.get('User-Agent') || null,
        severity: 'low',
        blocked: false
      });
      
      // Simulate processing delay with better error handling
      setTimeout(async () => {
        try {
          await storage.updateProjectStatus(
            project.id, 
            'completed', 
            `/api/media/${project.id}.${project.type === 'music' ? 'mp3' : 'mp4'}`
          );
        } catch (error) {
          console.error(`Failed to complete project ${project.id}:`, error);
          await storage.updateProjectStatus(project.id, 'failed');
        }
      }, Math.random() * 5000 + 2000); // Random delay between 2-7 seconds
      
      // Immediately update to processing
      await storage.updateProjectStatus(project.id, 'processing');
      
      res.status(201).json(project);
    } catch (error) {
      console.error('Project creation error:', error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  // Get specific project
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  // Create export
  app.post("/api/exports", async (req, res) => {
    try {
      const exportData = insertExportSchema.parse(req.body);
      
      // Generate mock file URL and size
      const fileUrl = `/api/downloads/${exportData.projectId}.${exportData.format}`;
      const fileSize = Math.floor(Math.random() * 10000000) + 1000000; // 1-10MB
      
      const exportRecord = await storage.createExport({
        ...exportData,
        fileUrl,
        fileSize,
      });
      
      res.json(exportRecord);
    } catch (error) {
      res.status(400).json({ error: "Invalid export data" });
    }
  });

  // Get exports for project
  app.get("/api/projects/:id/exports", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const exports = await storage.getExportsByProject(projectId);
      res.json(exports);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exports" });
    }
  });

  // Get project statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getProjectStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Mock media file endpoint
  app.get("/api/media/:filename", (req, res) => {
    // In a real app, this would serve actual media files
    res.json({ 
      message: "Media file would be served here",
      filename: req.params.filename,
      type: req.params.filename.endsWith('.mp3') ? 'audio' : 'video'
    });
  });

  // Mock download endpoint
  app.get("/api/downloads/:filename", (req, res) => {
    // In a real app, this would trigger file downloads
    res.json({ 
      message: "File download would start here",
      filename: req.params.filename
    });
  });

  // Security logging endpoint
  app.post("/api/security", async (req, res) => {
    try {
      const securityData = insertSecurityLogSchema.parse(req.body);
      const securityLog = await storage.logSecurityEvent(securityData);
      res.json(securityLog);
    } catch (error) {
      res.status(400).json({ error: "Invalid security data" });
    }
  });

  // Get security logs
  app.get("/api/security", async (req, res) => {
    try {
      const projectId = req.query.projectId ? parseInt(req.query.projectId as string) : undefined;
      const logs = await storage.getSecurityLogs(projectId);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch security logs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
