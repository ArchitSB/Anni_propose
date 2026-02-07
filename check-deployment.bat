@echo off
REM Deployment Pre-flight Check Script for Windows
REM Run this before deploying to verify everything works

echo 🚀 Starting deployment pre-flight checks...
echo.

REM Check Node version
echo ✅ Checking Node.js version...
node --version

REM Check npm version
echo ✅ Checking npm version...
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Run build
echo.
echo 🔨 Building project...
call npm run build

REM Check if build succeeded
if %errorlevel% equ 0 (
    echo.
    echo ✅ Build successful!
    echo.
    echo 📊 Build output:
    dir dist\
    echo.
    echo 🎉 Ready for deployment!
    echo.
    echo Next steps:
    echo 1. Run 'npm run preview' to test the production build locally
    echo 2. Deploy to Vercel: 'vercel' or push to your Git repository
) else (
    echo.
    echo ❌ Build failed! Please check the errors above.
    exit /b 1
)
