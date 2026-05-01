$env:PATH = "C:\Program Files\nodejs;$env:PATH"
Set-Location "C:\Users\Admin\Desktop\pokedex"
npx netlify deploy --prod
Read-Host "Press Enter to exit"
