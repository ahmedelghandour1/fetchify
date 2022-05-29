import { readdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
// import cp from 'child_process';
// import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);


// 1- search inside a directory for package.json. when it have package.json then install.
// 2- when not and have folders then 
// 3- do 1 again


const entryPoint = resolve(__dirname, '../examples');

const packageExist = existsSync(join(entryPoint, 'package.json'));

console.log(packageExist);

if (packageExist) {
    // install

    //return;
} else {
    const entries = readdirSync(entryPoint);
    console.log(entries);
    for (entry)
}










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