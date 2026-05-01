# Configure git user
& "C:\Program Files\Git\bin\git.exe" config user.email "folkss1@github.com"
& "C:\Program Files\Git\bin\git.exe" config user.name "Folkss1"

# Add all files and commit
& "C:\Program Files\Git\bin\git.exe" add .
& "C:\Program Files\Git\bin\git.exe" commit -m "Deploy Pokedex app"

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" branch -M main
& "C:\Program Files\Git\bin\git.exe" push -u origin main

Write-Host "Deploy completed!"
