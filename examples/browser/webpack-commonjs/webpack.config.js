/** Experimental */
const { resolve } = require("path");


module.exports = (env, argv) => {

    const mode = argv.mode;

    /** @type {import('webpack').Configuration} */
    const config = {
        target: 'web',
        entry: {
            script: resolve(__dirname, 'src/main.ts')
        },
        output: {
            filename: "[name].js",
            path: resolve(__dirname, "dist")
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

    if (mode !== 'production') {
        config.devtool = 'nosources-source-map';
    }

    return config;
};

