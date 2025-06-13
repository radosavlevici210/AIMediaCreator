#!/usr/bin/env node

import { build } from 'esbuild';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Building AI Media Creator for Netlify...');

// Build the frontend with Vite
console.log('📦 Building frontend...');
execSync('vite build', { stdio: 'inherit' });

// Ensure netlify/functions directory exists
const functionsDir = 'netlify/functions';
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
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
  outfile: 'api.js',
  external: ['@neondatabase/serverless'],
  allowOverwrite: true,
  banner: {
    js: `
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
    `
  }
}).catch(() => process.exit(1));

// Copy necessary assets
console.log('📋 Copying assets...');
if (fs.existsSync('public')) {
  execSync('cp -r public/* dist/', { stdio: 'inherit' });
}

console.log('✅ Netlify build complete!');
console.log('📁 Frontend built to: dist/');
console.log('⚡ Functions built to: netlify/functions/');