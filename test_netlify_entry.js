import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cliPath = join(__dirname, 'node_modules/netlify-cli/bin/run.js');

console.log('CLI Path:', cliPath);

// Now try to spawn the process
import { spawn } from 'child_process';

const child = spawn('"C:\\Program Files\\nodejs\\node.exe"', [cliPath, 'deploy', '--prod'], {
  shell: true,
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code);
});
