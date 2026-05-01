# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    & "C:\Program Files\Git\bin\git.exe" init
    & "C:\Program Files\Git\bin\git.exe" add .
    & "C:\Program Files\Git\bin\git.exe" commit -m "Initial commit"
}

# Add remote if not exists
$remoteUrl = "https://github.com/Folkss1/pokedex.git"
$existingRemote = & "C:\Program Files\Git\bin\git.exe" remote get-url origin 2>$null
if ($existingRemote -ne $remoteUrl) {
    & "C:\Program Files\Git\bin\git.exe" remote add origin $remoteUrl
}

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" branch -M main
& "C:\Program Files\Git\bin\git.exe" push -u origin main

Write-Host "Deploy completed!"
