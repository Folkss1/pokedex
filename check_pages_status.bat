@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
"C:\Program Files\GitHub CLI\gh.exe" api repos/Folkss1/pokedex/pages --method GET
pause
