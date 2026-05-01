@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
"C:\Program Files\GitHub CLI\gh.exe" repo create pokedex --public --source=. --push
pause
