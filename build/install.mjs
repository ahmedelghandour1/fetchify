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


install(resolve(__dirname, './../examples'))









// get library path
// var libs = resolve(__dirname, '../');

// const inner = readdirSync(libs, { withFileTypes: true })
//     .map(mode => ([mode.name, mode.isDirectory()]));

// console.log(inner);
// forEach(function (mod) {
//     const isDir = mod.isDirectory();

//     console.log(mod.name, isDir);
//     var modPath = join(lib, mod);
//     console.log('start', modPath);
//     // ensure path has package.json
//     if (!fs.existsSync(join(modPath, 'package.json'))) {
//         return;
//     }
//     console.log('after start');


//     // npm binary based on OS
//     var npmCmd = os.platform().startsWith('win') ? 'npm.cmd' : 'npm';

//     // install folder
//     const ls = cp.spawn(npmCmd, ['i'], {
//         env: process.env,
//         cwd: modPath,
//         stdio: 'inherit'
//     });

//     ls.on('close', (code, signal) => {
//         console.log(code, signal);
//     })
// })