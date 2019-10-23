const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');
const { serverPort, distDir } = require('./webpack.custom');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, distDir), // the root for the server
        watchContentBase: true, // so we reload if other stuff like CSS changes
        port: serverPort,
        watchOptions: {
            ignored: /node_modules/
        },
        hot: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
});