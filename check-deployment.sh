#!/bin/bash

# Deployment Pre-flight Check Script
# Run this before deploying to verify everything works

echo "🚀 Starting deployment pre-flight checks..."
echo ""

# Check Node version
echo "✅ Checking Node.js version..."
node --version

# Check npm version
echo "✅ Checking npm version..."
npm --version

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Run build
echo ""
echo "🔨 Building project..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build successful!"
    echo ""
    echo "📊 Build output:"
    ls -lh dist/
    echo ""
    echo "🎉 Ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "1. Run 'npm run preview' to test the production build locally"
    echo "2. Deploy to Vercel: 'vercel' or push to your Git repository"
else
    echo ""
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi
