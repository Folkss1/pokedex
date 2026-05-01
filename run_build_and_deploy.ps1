# Build the project first
& "C:\Program Files\nodejs\node.exe" "C:\Users\Admin\Desktop\pokedex\node_modules\vite\bin\vite.js" build

# Then deploy to Netlify
& "C:\Program Files\nodejs\node.exe" "C:\Users\Admin\Desktop\pokedex\node_modules\netlify-cli\bin\run.js" deploy --prod
