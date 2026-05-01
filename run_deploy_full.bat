@echo off
setlocal enabledelayedexpansion

set "PATH=C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;%PATH%"
set "NODE_PATH=C:\Program Files\nodejs\node_modules"

cd /d C:\Users\Admin\Desktop\pokedex

echo ============================================
echo Pokedex Deployment Script
echo ============================================
echo.
echo Step 1: Installing netlify-cli...
call npm install netlify-cli --save-dev

if errorlevel 1 (
    echo Error installing netlify-cli
    goto :error
)

echo.
echo Step 2: Building the project...
call npm run build

if errorlevel 1 (
    echo Error building project
    goto :error
)

echo.
echo Step 3: Deploying to Netlify...
call npx netlify deploy --prod --dir=dist

if errorlevel 1 (
    echo Error deploying
    goto :error
)

echo.
echo ============================================
echo Deployment Complete!
echo ============================================
pause
exit /b 0

:error
echo.
echo ============================================
echo Deployment Failed!
echo ============================================
pause
exit /b 1
