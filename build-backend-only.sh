#!/bin/bash

echo "🏗️ Building backend only for testing..."

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

echo "✅ Backend build completed successfully!"
