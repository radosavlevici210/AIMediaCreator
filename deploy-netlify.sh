#!/bin/bash

# AI Media Creator - Netlify Deployment Script
echo "🚀 Deploying AI Media Creator to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the project
echo "📦 Building project..."
node build-netlify.js

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=dist --functions=netlify/functions

echo "✅ Deployment complete!"
echo "🔗 Your site is now live with automatic HTTPS"
echo "📊 Monitor deployment at: https://app.netlify.com"