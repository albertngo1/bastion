const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
    devtool: "source-map",
    module: {
        rules: [
            {
              test: [/\.js$/],
              exclude: [/node_modules/],
              loader: 'babel-loader',
              options: { presets: ['es2015'] },
              exclude: /node_modules(?!\/webpack-dev-server)/,
            }
        ]
    }
}
