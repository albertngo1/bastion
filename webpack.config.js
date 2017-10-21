module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist",
        publicPath: "/dist",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
              test: [/\.js$/],
              exclude: [/node_modules/],
              loader: 'babel-loader',
              options: { presets: ['es2015'] }
            }
        ]
    }
}
