const path = require('path');
const WebpackNotifierPlugin = require("webpack-notifier");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const customConfigs = require('./webpack.custom'); // Using your own configs

module.exports = {
    entry: customConfigs.entryPoints,// which file to begin with
    output: {
        path: path.join(__dirname, customConfigs.distDir), // what folder to put bundle in
        filename: '[name].[hash].js', // what name to use for bundle
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.join(__dirname, "src")
                ],
                use: ['babel-loader']
            },
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new WebpackNotifierPlugin({ alwaysNotify: true }),
        new HtmlWebpackPlugin({ template: customConfigs.htmlTemplate }),
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!images'] // No remove "images" for a faster development
        }),
        new WriteFilePlugin({
            test: /\.(png|jpg|gif|svg|ico)$/i
        }),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' }
        ])
    ]
};