@echo off
cd /d C:\Users\Admin\Desktop\pokedex
call "C:\Program Files\nodejs\nodevars.bat"
node "C:\Users\Admin\Desktop\pokedex\node_modules\netlify-cli\bin\run.js" deploy --prod
pause
