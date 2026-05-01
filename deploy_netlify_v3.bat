@echo off
cd /d C:\Users\Admin\Desktop\pokedex
node_modules\.bin\netlify.cmd deploy --prod --dir=dist
pause
