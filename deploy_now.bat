@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
call npm run build
call npx netlify deploy --prod --dir=dist
pause
