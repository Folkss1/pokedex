@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
node node_modules\bin\netlify.js deploy --prod --dir=dist
pause
