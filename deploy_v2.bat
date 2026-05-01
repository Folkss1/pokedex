@echo off
set PATH=C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;%PATH%
cd /d C:\Users\Admin\Desktop\pokedex
netlify deploy --prod --dir=dist
echo Deploy complete!
