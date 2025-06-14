const serverless = require('serverless-http');
const express = require('express');
// CORS completely removed

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      connectSrc: ["'self'", "wss:", "https:"],
      mediaSrc: ["'self'", "blob:"],
      workerSrc: ["'self'", "blob:"]
    }
  }
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ai-enterprise-studio.netlify.app', 'https://ai-studio-pro.netlify.app']
    : ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5173'],
  credentials: true
}));

app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-memory storage for demo purposes
let projects = [];
let exports = [];
let messages = [];
let users = [
  {
    id: 1,
    email: 'ervin210@icloud.com',
    name: 'Ervin Radosavljevic',
    role: 'root',
    status: 'active',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    email: 'radosavlevici.ervin@gmail.com',
    name: 'Ervin Radosavljevic',
    role: 'root',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const project = {
    id: projects.length + 1,
    ...req.body,
    status: 'processing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projects.push(project);
  res.status(201).json(project);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.put('/api/projects/:id', (req, res) => {
  const projectIndex = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(projects[projectIndex]);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  res.status(201).json(user);
});

app.get('/api/exports', (req, res) => {
  const projectId = req.query.projectId;
  const filteredExports = projectId 
    ? exports.filter(e => e.projectId === parseInt(projectId))
    : exports;
  res.json(filteredExports);
});

app.post('/api/exports', (req, res) => {
  const exportData = {
    id: exports.length + 1,
    ...req.body,
    status: 'processing',
    createdAt: new Date().toISOString()
  };
  exports.push(exportData);
  res.status(201).json(exportData);
});

app.get('/api/messages', (req, res) => {
  const projectId = req.query.projectId;
  const filteredMessages = projectId 
    ? messages.filter(m => m.projectId === parseInt(projectId))
    : messages;
  res.json(filteredMessages);
});

app.post('/api/messages', (req, res) => {
  const message = {
    id: messages.length + 1,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  messages.push(message);
  res.status(201).json(message);
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    processingProjects: projects.filter(p => p.status === 'processing').length,
    totalUsers: users.length,
    totalExports: exports.length,
    avgProcessingTime: 120000 // 2 minutes in ms
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports.handler = serverless(app);