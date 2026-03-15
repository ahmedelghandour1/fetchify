/**
 * ! ============= DEPRECATED =============
 * script to install node_modules for sub modules 
 */

import { readdirSync, existsSync, statSync } from 'fs';
import { resolve, dirname, join } from 'path';
import cp from 'child_process';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

function install(startDir) {
    const packageExist = existsSync(join(startDir, 'package.json'));
    if (packageExist) {

        const npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

        const ls = cp.spawn(npmCmd, ['i'], {
            env: process.env,
            cwd: startDir,
            stdio: 'inherit'
        });

        ls.on('close', (code, signal) => {
            console.log(startDir);
        })

        return;
    } else {
        const entries = readdirSync(startDir);
        for (const entry of entries) {
            if (statSync(join(startDir, entry)).isDirectory()) {
                install(join(startDir, entry))
            }
        }

    }
}


install(resolve(__dirname, './../playground'))

