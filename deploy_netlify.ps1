# PowerShell script to deploy to Netlify
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

Set-Location "C:\Users\Admin\Desktop\pokedex"

Write-Host "Deploying to Netlify..." -ForegroundColor Cyan
& "C:\Program Files\nodejs\node.exe" "node_modules/netlify-cli/bin/run.js" deploy --prod --dir=dist 2>&1 | Out-Host
