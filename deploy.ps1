$env:PATH = "C:\Program Files\nodejs;C:\Users\Admin\AppData\Roaming\npm;$env:PATH"
$env:NODE_PATH = "C:\Program Files\nodejs\node_modules"
cd C:\Users\Admin\Desktop\pokedex
& netlify deploy --prod --dir=dist
