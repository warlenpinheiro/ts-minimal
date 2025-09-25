#!/bin/bash

echo "🚀 Setting up Boilerplate TypeScript Minimal..."

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

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "⚠️  .env file already exists"
fi

# Run linting
echo "🔍 Running linter..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm test

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📚 Available commands:"
echo "  npm run dev      - Start development server"
echo "  npm run build    - Build for production"
echo "  npm start        - Start production server"
echo "  npm test         - Run tests"
echo "  npm run lint     - Run linter"
echo ""
echo "🐳 Docker commands:"
echo "  docker-compose up -d    - Start with Docker"
echo "  docker-compose down     - Stop Docker containers"
echo ""
echo "📖 Documentation available at: http://localhost:3000/docs"