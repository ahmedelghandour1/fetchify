/** @type {import('webpack').Configuration} */
export default {
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 8080,
    },
    entry: {
        build
    },
}