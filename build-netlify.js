const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building AI Media Creator for Netlify...');

// Install dependencies
console.log('📦 Installing dependencies...');
execSync('npm ci', { stdio: 'inherit' });

// Build the frontend
console.log('🏗️ Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

// Create Netlify functions directory
const functionsDir = path.join(__dirname, 'netlify', 'functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

// Copy and optimize API function
const apiFunction = `
const express = require('express');
const serverless = require('serverless-http');
const { registerRoutes } = require('../../dist/routes');

const app = express();

// Enable compression
const compression = require('compression');
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Register API routes
registerRoutes(app);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports.handler = serverless(app);
`;

fs.writeFileSync(path.join(functionsDir, 'api.js'), apiFunction);

console.log('✅ Netlify build complete!');
console.log('🌐 Ready for deployment with optimized performance');