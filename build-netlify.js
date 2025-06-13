
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building AI Enterprise Studio for Netlify Production...');

// Ensure node_modules are installed
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
}

// Clean previous builds
if (fs.existsSync('dist')) {
  console.log('🧹 Cleaning previous build...');
  execSync('rm -rf dist', { stdio: 'inherit' });
}

// Build the client application
console.log('⚡ Building client application...');
execSync('npm run build', { stdio: 'inherit' });

// Copy additional assets
console.log('📁 Copying additional assets...');

// Create manifest for PWA
const manifest = {
  name: "AI Enterprise Studio Pro+",
  short_name: "AI Studio",
  description: "Professional AI-powered content creation suite with voice synthesis and animation",
  start_url: "/",
  display: "standalone",
  background_color: "#0a0a0a",
  theme_color: "#00ff88",
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml"
    }
  ],
  categories: ["entertainment", "multimedia", "productivity"],
  features: [
    "AI Voice Synthesis",
    "Advanced Animation",
    "8K/IMAX Quality",
    "Real-time Collaboration",
    "Professional Export"
  ]
};

fs.writeFileSync(path.join('dist', 'manifest.json'), JSON.stringify(manifest, null, 2));

// Create sitemap for SEO
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ai-enterprise-studio.netlify.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ai-enterprise-studio.netlify.app/studio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

fs.writeFileSync(path.join('dist', 'sitemap.xml'), sitemap);

// Create robots.txt
const robots = `User-agent: *
Allow: /
Sitemap: https://ai-enterprise-studio.netlify.app/sitemap.xml

# AI Enterprise Studio Pro+
# Professional AI-powered content creation
`;

fs.writeFileSync(path.join('dist', 'robots.txt'), robots);

// Create _headers file for security and performance
const headers = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' wss:; media-src 'self' blob:
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.woff2
  Cache-Control: public, max-age=31536000, immutable

/api/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
  Access-Control-Allow-Headers: Content-Type, Authorization
`;

fs.writeFileSync(path.join('dist', '_headers'), headers);

// Create _redirects for SPA routing
const redirects = `# Single Page Application redirects
/api/* /.netlify/functions/api/:splat 200
/* /index.html 200

# Legacy redirects
/studio /studio/ 301
/dashboard /studio/ 301
`;

fs.writeFileSync(path.join('dist', '_redirects'), redirects);

// Copy server functions to Netlify functions directory
if (!fs.existsSync('netlify/functions')) {
  fs.mkdirSync('netlify/functions', { recursive: true });
}

// Optimize for production
console.log('🔧 Optimizing for production...');

// Add performance monitoring script
const performanceScript = `
// Performance monitoring for AI Enterprise Studio
(function() {
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
      }, 0);
    });
  }
})();
`;

const distIndexPath = path.join('dist', 'index.html');
if (fs.existsSync(distIndexPath)) {
  let indexContent = fs.readFileSync(distIndexPath, 'utf8');
  indexContent = indexContent.replace(
    '</body>',
    `<script>${performanceScript}</script></body>`
  );
  fs.writeFileSync(distIndexPath, indexContent);
}

console.log('✅ Build completed successfully!');
console.log('🌐 Ready for Netlify deployment');
console.log('📊 Features included:');
console.log('  - AI Voice Synthesis');
console.log('  - Advanced Animation Studio');
console.log('  - 8K/IMAX Quality Export');
console.log('  - Real-time Collaboration');
console.log('  - Professional PWA');
console.log('  - SEO Optimization');
console.log('  - Security Headers');
console.log('  - Performance Monitoring');
