#!/bin/bash

echo "🏗️ Building monolith application with frontend fixes..."

# Build frontend with specific fixes
echo "📦 Building frontend..."
cd frontend

# Remove problematic dependencies
rm -rf node_modules package-lock.json

# Install with specific flags to avoid native dependencies
npm install --legacy-peer-deps --no-optional --ignore-scripts

# Try to build
npm run build
if [ $? -ne 0 ]; then
    echo "⚠️ Frontend build failed, trying alternative approach..."
    
    # Install without optional dependencies
    npm install --legacy-peer-deps --no-optional --ignore-scripts --force
    
    # Try build again
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Frontend build failed completely"
        exit 1
    fi
fi

cd ..

# Build backend
echo "🔧 Building backend..."
cd backend
npm install --no-optional
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Backend build failed"
    exit 1
fi

cd ..

echo "✅ Build completed successfully!"
