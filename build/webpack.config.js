/** Experimental */
const { resolve } = require("path");

function browserBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'web',
        experiments: {
            outputModule: true
        },
        entry: {
            main: '../src/platforms/browser.ts'
        },
        output: {
            filename: "[name].esm.js",
            path: resolve(__dirname, "../dist"),
            libraryTarget: 'module',
            globalObject: 'this',
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
                    test: /\.tsx?$/,
                    exclude: /[\\/]node_modules[\\/]/,
                    use: [
                        // {
                        //     loader: "babel-loader",
                        //     options: {
                        //         presets: [
                        //             "@babel/preset-env",
                        //             "@babel/preset-typescript",
                        //         ],
                        //     },
                        // },
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

function nodejsBuild() {
    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'node',
        entry: {
            main: '../src/platforms/nodejs.ts'
        },
        output: {
            filename: "[name].common.js",
            path: resolve(__dirname, "dist"),
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
    const nodeConfig = nodejsBuild();
    const browserConfig = browserBuild();
    Object.assign(nodeConfig, generalConfig);
    Object.assign(browserConfig, generalConfig);

    return [
        nodeConfig,
        browserConfig
    ]
};

