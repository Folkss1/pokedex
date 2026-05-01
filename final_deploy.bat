@echo off
set PATH=C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;%PATH%
"C:\Program Files\nodejs\npm.cmd" run build
echo Build complete. Now deploying...
"C:\Program Files\nodejs\node.exe" "%USERPROFILE%\AppData\Roaming\npm\node_modules\netlify-cli\bin\run.js" deploy --prod --dir=dist
echo Deploy complete!
