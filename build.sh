#!/bin/bash

echo "🏗️ Building monolith application..."

# Set Node.js version
export NODE_VERSION=18.19.1

# Build frontend
echo "📦 Building frontend..."
cd frontend

# Clean install with legacy peer deps to avoid conflicts
npm ci --legacy-peer-deps --no-optional
if [ $? -ne 0 ]; then
    echo "⚠️ npm ci failed, trying npm install..."
    npm install --legacy-peer-deps --no-optional
fi

# Build frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

# Build backend
echo "🔧 Building backend..."
cd backend

# Clean install
npm ci --no-optional
if [ $? -ne 0 ]; then
    echo "⚠️ npm ci failed, trying npm install..."
    npm install --no-optional
fi

# Build backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo "✅ Build completed successfully!"
