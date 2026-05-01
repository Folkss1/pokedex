@echo off
cd /d C:\Users\Admin\Desktop\pokedex
call "C:\Program Files\nodejs\nodevars.bat"
npx netlify-cli deploy --prod
pause
