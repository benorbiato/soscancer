#!/bin/bash

# SOS Cancer Backend Setup Script

echo "🚀 Setting up SOS Cancer Backend (NestJS)..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update the JWT_SECRET in .env file."
else
    echo "✅ .env file already exists."
fi

# Create data directory if it doesn't exist
if [ ! -d data ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the JWT_SECRET in .env file"
echo "2. Run 'npm run start:dev' to start the development server"
echo "3. Visit http://localhost:8000/docs for API documentation"
echo ""
echo "Happy coding! 🚀"
