/*
COPYRIGHT © ERVIN REMUS RADOSAVLEVICI - ALL RIGHTS RESERVED
PRIVATE PROPERTY - UNAUTHORIZED MODIFICATION PROHIBITED
PROTECTED BY INTERNATIONAL COPYRIGHT LAW
*/

import { build } from 'esbuild';
import { copyFileSync, mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const AUTHOR = 'Ervin Remus Radosavlevici';
const COPYRIGHT = `COPYRIGHT © ${AUTHOR} - ALL RIGHTS RESERVED`;

// Ensure netlify functions directory exists
const functionsDir = 'netlify/functions';
if (!existsSync(functionsDir)) {
  mkdirSync(functionsDir, { recursive: true });
}

// Build the serverless function for Netlify
try {
  await build({
    entryPoints: ['server/index.ts'],
    bundle: true,
    outfile: 'netlify/functions/api.js',
    platform: 'node',
    target: 'node18',
    format: 'cjs',
    external: ['@neondatabase/serverless'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    banner: {
      js: `/*\n${COPYRIGHT}\nPRIVATE PROPERTY - UNAUTHORIZED USE STRICTLY PROHIBITED\n*/`,
    },
    minify: true,
    sourcemap: false,
  });

  // Create _headers file for Netlify with copyright protection
  const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  X-Copyright: ${COPYRIGHT}
  X-Owner: ${AUTHOR}
  X-Creator: ${AUTHOR}
  X-Private-Property: ${AUTHOR}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:

/api/*
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable

*.js
  Cache-Control: public, max-age=31536000, immutable

*.css
  Cache-Control: public, max-age=31536000, immutable`;

  writeFileSync('dist/_headers', headersContent);

  // Create _redirects file for Netlify SPA routing
  const redirectsContent = `/api/* /.netlify/functions/api/:splat 200
/* /index.html 200`;

  writeFileSync('dist/_redirects', redirectsContent);

  console.log(`✅ ${COPYRIGHT}`);
  console.log('✅ Netlify build completed successfully');
  console.log('✅ Copyright protection headers added');
  console.log('✅ Security headers configured');
  console.log('✅ SPA routing configured');

} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}