@echo off
set "PATH=C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;%PATH%"
cd /d C:\Users\Admin\Desktop\pokedex
echo Installing netlify-cli...
call npm install netlify-cli --save-dev
echo Building the project...
call npm run build
echo Deploying to Netlify...
call npx netlify deploy --prod --dir=dist
pause
