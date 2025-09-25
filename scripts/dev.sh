#!/bin/bash

echo "🔧 Starting development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
fi

# Start development server
echo "🚀 Starting development server..."
npm run dev