@echo off
"C:\Program Files\nodejs\node.exe" --loader ts-node/esm node_modules/netlify-cli/bin/run.js deploy --prod
pause
