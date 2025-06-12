import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertExportSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new project
  app.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      
      // Simulate processing delay
      setTimeout(async () => {
        await storage.updateProjectStatus(
          project.id, 
          'completed', 
          `/api/media/${project.id}.${project.type === 'music' ? 'mp3' : 'mp4'}`
        );
      }, 3000);
      
      // Immediately update to processing
      await storage.updateProjectStatus(project.id, 'processing');
      
      res.json(project);
    } catch (error) {
      res.status(400).json({ error: "Invalid project data" });
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

  const httpServer = createServer(app);
  return httpServer;
}
