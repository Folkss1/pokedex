# Pokedex Netlify Install and Deploy Script
$env:PATH = "C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;$env:PATH"
$env:NODE_PATH = "C:\Program Files\nodejs\node_modules"

Set-Location "C:\Users\Admin\Desktop\pokedex"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Pokedex Deployment Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Installing netlify-cli..." -ForegroundColor Yellow
& npm install netlify-cli --save-dev

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error installing netlify-cli" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Building the project..." -ForegroundColor Yellow
& npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building project" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Deploying to Netlify..." -ForegroundColor Yellow
& npx netlify deploy --prod --dir=dist

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error deploying" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
