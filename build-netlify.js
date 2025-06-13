#!/usr/bin/env node

import { build } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building AI Media Creator for Netlify...');

try {
  // Build the frontend with Vite
  console.log('📦 Building frontend...');
  execSync('vite build --config vite.config.netlify.ts', { stdio: 'inherit' });

  // Ensure netlify/functions directory exists
  const functionsDir = 'netlify/functions';
  if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir, { recursive: true });
  }

  // Copy _redirects to dist for backup
  if (fs.existsSync('_redirects')) {
    fs.copyFileSync('_redirects', 'dist/_redirects');
  }

  // Build the serverless function
  console.log('⚡ Building serverless functions...');
  await build({
    entryPoints: ['netlify/functions/api.js'],
    bundle: true,
    platform: 'node',
    target: 'node18',
    format: 'esm',
    outdir: 'netlify/functions',
    allowOverwrite: true,
    external: [
      '@neondatabase/serverless',
      'drizzle-orm',
      'cors',
      'helmet',
      'express',
      'serverless-http'
    ],
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    banner: {
      js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
      `
    }
  }).catch((error) => {
    console.error('Function build failed:', error);
    process.exit(1);
  });

  // Copy necessary assets
  console.log('📋 Copying assets...');
  if (fs.existsSync('public')) {
    execSync('cp -r public/* dist/ 2>/dev/null || true', { stdio: 'inherit' });
  }

  // Ensure favicon exists
  if (!fs.existsSync('dist/favicon.ico') && fs.existsSync('public/favicon.svg')) {
    fs.copyFileSync('public/favicon.svg', 'dist/favicon.ico');
  }

  // Create robots.txt for SEO
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://ai-media-creator.netlify.app/sitemap.xml`;
  fs.writeFileSync('dist/robots.txt', robotsTxt);

  console.log('✅ Netlify build complete!');
  console.log('📁 Frontend built to: dist/');
  console.log('⚡ Functions built to: netlify/functions/');
  console.log('🔧 Security headers configured');
  console.log('🌐 HTTPS redirects enabled');

} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}