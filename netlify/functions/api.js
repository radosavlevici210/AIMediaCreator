import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import helmet from 'helmet';
import { registerRoutes } from '../../server/routes.js';
import { createServer } from 'http';

const app = express();

// Enhanced security middleware for Netlify
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "ws:", "wss:", "https:"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "blob:", "data:"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Router-Connection']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });

  next();
});

// Create mock server for registerRoutes
const mockServer = createServer();

// Initialize routes
registerRoutes(app).then(() => {
  console.log('Routes registered successfully');
}).catch((error) => {
  console.error('Route registration failed:', error);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    platform: "netlify",
    environment: process.env.NODE_ENV || 'production'
  });
});

// Router connection check endpoint  
app.get("/api/router-status", (req, res) => {
  try {
    res.status(200).json({ 
      status: "connected",
      server: "online",
      connected: true,
      timestamp: new Date().toISOString(),
      platform: "netlify",
      environment: process.env.NODE_ENV || 'production'
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({
      status: "error",
      connected: false,
      timestamp: new Date().toISOString(),
      error: "Health check failed"
    });
  }
});

// Enhanced error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error('Error details:', {
    status,
    message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });

  res.status(status).json({ 
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

export const handler = serverless(app);