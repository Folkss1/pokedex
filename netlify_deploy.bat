@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
.\node_modules\.bin\netlify.cmd deploy --prod --dir=dist
echo Deploy complete!
