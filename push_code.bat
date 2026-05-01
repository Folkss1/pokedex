@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
"C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/Folkss1/pokedex.git
"C:\Program Files\Git\bin\git.exe" branch -M main
"C:\Program Files\Git\bin\git.exe" push -u origin main
pause
