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
            js: require('./package').buildBanner(),
        }
    }

    return config;
}

const commonJsBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'node',
        outfile: resolve(__dirname, '../dist/build.common.js'),
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

const umdBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'browser',
        outfile: resolve(__dirname, '../dist/build.umd.js'),
        bundle: true,
        sourcemap: 'external',
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

const esmBuild = () => {
    /**  @type {import('esbuild').BuildOptions}  */
    const config = {
        platform: 'browser',
        outfile: resolve(__dirname, '../dist/build.esm.js'),
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

/**  
 * @param {import('esbuild').BuildOptions} params  */
const build = (params) => {
    require('esbuild').build(params)
        .then((result) => console.log(`⚡ ${mode === 'production' ? 'done' : 'watching'}...`, result))
        .catch((err) => {
            console.log(err);
        });

}

/** build.common.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/nodejs.ts')),
    ...commonJsBuild()
})

/** build.umd.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/browser.ts')),
    ...umdBuild()
})

/** build.esm.js */
build({
    ...baseConfig(resolve(__dirname, '../src/platforms/browser.ts')),
    ...esmBuild()
})
