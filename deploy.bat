@echo off
set PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
npm install -g netlify-cli
netlify deploy --prod --dir=dist
echo Deploy complete!
