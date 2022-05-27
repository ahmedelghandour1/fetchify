const mode = process.env.NODE_ENV;
const watch = process.env.WATCH;
const { resolve } = require('path');
console.log(!!watch);
const baseConfig = (src) => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        entryPoints: [src],
        loader: { ".ts": 'ts' },
        minify: mode === 'production',
        watch: !!watch,
        banner: {
            js: require('./banner').buildBanner(),
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
        format: 'cjs'
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
        outfile: resolve(__dirname, '../dist/node/build.esm.js'),
        loader: { ".ts": 'ts' },
        bundle: true,
        treeShaking: true,
        format: 'esm'
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.esm.js')
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
        outfile: resolve(__dirname, '../dist/browser/build.esm.js'),
        loader: { ".ts": 'ts' },
        bundle: true,
        sourcemap: 'inline',
        treeShaking: true,
        format: 'esm'
    }

    if (mode === 'development') {
        config.watch = {
            onRebuild(error, result) {
                if (error) console.error('watch build failed:', error)
                else console.log('watch build succeeded: build.esm.js')
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
        format: 'cjs'
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
    require('esbuild').build(params)
        .then((result) => console.log(`⚡ ${mode === 'production' ? 'done' : 'watching'}...`, result))
        .catch((err) => {
            console.log(err);
        });

}


//=========== BROWSER ============


require('fs').rmSync(resolve(__dirname, '../dist'), { force: true, recursive: true });

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

/** build.umd.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/nodejs.ts')),
    ...UMDBuild()
})

/** build.esm.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/nodejs.ts')),
    ...nodeESMBuild()
})
