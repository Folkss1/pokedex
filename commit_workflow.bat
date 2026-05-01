@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Add GitHub Actions workflow for Pages deployment"
"C:\Program Files\Git\bin\git.exe" push -u origin main
pause
