import { rmSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildBanner } from './banner.mjs';
import { build as esBuild } from 'esbuild'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mode = process.env.NODE_ENV;
const watch = process.env.WATCH;

const baseConfig = (src) => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        entryPoints: [src],
        loader: { ".ts": 'ts' },
        minify: mode === 'production',
        watch: !!watch,
        banner: {
            js: buildBanner(),
        }
    }

    return config;
}

//nodejs
const nodeCommonJsBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'node',
        outfile: resolve(__dirname, '../dist/node/build.common.js'),
        loader: { ".ts": 'ts' },
        bundle: true,
        treeShaking: true,
        format: 'cjs',
        define: {
            FileOutput: mode !== 'production' && "'dist/node/build.common.js'"
        }
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.common.js')
            },
        }
    }

    return config;
}
const nodeESMBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'node',
        outfile: resolve(__dirname, '../dist/node/build.esm.mjs'),
        loader: { ".ts": 'ts' },
        bundle: true,
        treeShaking: true,
        format: 'esm',
        define: {
            FileOutput: mode !== 'production' && "'dist/node/build.esm.mjs'"
        }
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.esm.mjs')
            },
        }
    }

    return config;
}

//browser
const UMDBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'browser',
        outfile: resolve(__dirname, '../dist/browser/build.umd.js'),
        bundle: true,
        sourcemap: 'inline',
        globalName: 'window.fetchify',
        format: 'iife',
        define: {
            FileOutput: mode !== 'production' && "'dist/browser/build.umd.js'"
        }
    }
    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.umd.js')
            },
        }
    }

    return config;
}

const browserESMBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'browser',
        outfile: resolve(__dirname, '../dist/browser/build.esm.mjs'),
        loader: { ".ts": 'ts' },
        bundle: true,
        sourcemap: 'inline',
        treeShaking: true,
        format: 'esm',
        define: {
            FileOutput: mode !== 'production' && "'dist/browser/build.esm.mjs'"
        }
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.esm.mjs')
            },
        }
    }

    return config;
}
const browserCommonJsBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'browser',
        outfile: resolve(__dirname, '../dist/browser/build.common.js'),
        loader: { ".ts": 'ts' },
        bundle: true,
        treeShaking: true,
        sourcemap: 'inline',
        format: 'cjs',
        define: {
            FileOutput: mode !== 'production' && "'dist/browser/build.common.js'"
        }
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.common.js')
            },
        }
    }

    return config;
}

/**  
 * @param {import('esbuild').BuildOptions} params  */
const build = (params) => {
    esBuild(params)
        .then((result) => console.log(`⚡ ${mode === 'production' ? 'done' : 'watching'}...`, result))
        .catch((err) => {
            console.log(err);
        });

}


rmSync(resolve(__dirname, '../dist'), { force: true, recursive: true });


//=========== BROWSER ============

/** build.common.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/browser.ts')),
    ...browserCommonJsBuild()
})

/** build.umd.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/browser.ts')),
    ...UMDBuild()
})

/** build.esm.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/browser.ts')),
    ...browserESMBuild()
})


//=========== NODEJS ============

/** build.common.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/nodejs.ts')),
    ...nodeCommonJsBuild()
})

/** build.esm.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/nodejs.ts')),
    ...nodeESMBuild()
})
