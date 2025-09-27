#!/bin/bash

echo "🏗️ Building monolith application..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install --legacy-peer-deps --no-optional
npm run build
cd ..

# Build backend
echo "🔧 Building backend..."
cd backend
npm install --no-optional
npm run build
cd ..

echo "✅ Build completed successfully!"
