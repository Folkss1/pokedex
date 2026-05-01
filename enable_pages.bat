@echo off
set PATH=C:\Program Files\Git\bin;C:\Program Files\Git\cmd;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
echo Enabling GitHub Pages...
"C:\Program Files\GitHub CLI\gh.exe" api -X PUT repos/Folkss1/pokedex/pages --input -
echo.
echo Visit: https://folkss1.github.io/pokedex
pause
