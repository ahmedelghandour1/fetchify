/** Experimental */
const { resolve } = require("path");


const entryPath = resolve(__dirname, "../")

function browserESMBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'web',
        experiments: {
            outputModule: true
        },
        entry: {
            main: resolve(entryPath, 'src/platforms/browser.ts')
        },
        output: {
            filename: "build.esm.js",
            path: resolve(entryPath, "dist/browser"),
            libraryTarget: 'module',
            globalObject: 'this',
            libraryExport: 'default',
        },
        resolve: {
            alias: {
                '@': resolve(entryPath, 'src')
            },
            extensions: ['.tsx', '.ts', '.js'],
            mainFields: ["exports", "module", "main"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /[\\/]node_modules[\\/]/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                },
            ]
        }
    }
    return config;
}

function browserCommonJsBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'web',
        entry: {
            main: resolve(entryPath, 'src/platforms/browser.ts')
        },
        output: {
            filename: "build.common.js",
            path: resolve(entryPath, "dist/browser"),
            libraryTarget: 'commonjs',
            globalObject: 'this',
            libraryExport: 'default',
        },
        resolve: {
            alias: {
                '@': resolve(entryPath, 'src')
            },
            extensions: ['.tsx', '.ts', '.js'],
            mainFields: ["exports", "module", "main"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /[\\/]node_modules[\\/]/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                },
            ]
        }
    }
    return config;
}

function nodejsCommonBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'node',
        entry: {
            main: resolve(entryPath, 'src/platforms/nodejs.ts')
        },
        output: {
            filename: "build.common.js",
            path: resolve(entryPath, "dist/node"),
            libraryTarget: 'umd',
            libraryExport: 'default',
        },
        resolve: {
            alias: {
                '@': resolve(entryPath, 'src')
            },
            extensions: ['.tsx', '.ts', '.js'],
            mainFields: ["exports", "module", "main"],
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /[\\/]node_modules[\\/]/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                },
            ]
        }
    }

    return config;
}

function nodejsESMBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'node',
        experiments: {
            outputModule: true
        },
        entry: {
            main: resolve(entryPath, 'src/platforms/nodejs.ts')
        },
        output: {
            filename: "build.common.js",
            path: resolve(__dirname, "dist/node"),
            libraryTarget: 'umd',
            libraryExport: 'default',
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src')
            },
            extensions: ['.tsx', '.ts', '.js'],
            mainFields: ["exports", "module", "main"],
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: /[\\/]node_modules[\\/]/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ],
                },
            ]
        }
    }

    return config;
}


module.exports = (env, argv) => {
    const generalConfig = {};
    if (argv.mode === 'development') {
        generalConfig.devtool = 'cheap-module-source-map';
    } else if (argv.mode === 'production') {
    } else {
        throw new Error('Specify env');
    }
    const nodeCMConfig = nodejsCommonBuild();;
    const nodeESMConfig = nodejsESMBuild();;
    const browserCMConfig = browserCommonJsBuild();
    const browserESMConfig = browserESMBuild();
    Object.assign(nodeCMConfig, generalConfig);
    Object.assign(nodeESMConfig, generalConfig);
    Object.assign(browserCMConfig, generalConfig);
    Object.assign(browserESMConfig, generalConfig);

    return [
        nodeCMConfig,
        // nodeESMConfig,
        browserCMConfig,
        browserESMConfig,
    ]
};

