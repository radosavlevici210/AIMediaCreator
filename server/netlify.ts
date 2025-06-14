/*
COPYRIGHT © ERVIN REMUS RADOSAVLEVICI - ALL RIGHTS RESERVED
PRIVATE PROPERTY - UNAUTHORIZED MODIFICATION PROHIBITED
PROTECTED BY INTERNATIONAL COPYRIGHT LAW
*/

import serverless from 'serverless-http';
import express from 'express';
import { registerRoutes } from './routes.js';

const app = express();

// Register all routes
registerRoutes(app).then(() => {
  console.log('Routes registered successfully');
}).catch(error => {
  console.error('Error registering routes:', error);
});

// Export for Netlify Functions
export const handler = serverless(app);