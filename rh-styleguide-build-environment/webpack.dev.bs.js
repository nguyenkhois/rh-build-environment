const merge = require('webpack-merge');
const devconfig = require('./webpack.dev');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { host, serverPort, browserSyncPort } = require('./webpack.custom');

module.exports = merge(devconfig, {
    plugins: [
        new BrowserSyncPlugin({
            host: host,
            port: browserSyncPort,
            proxy: `http://${host}:${serverPort}`,//http://localhost:3000
            open: false,
            notify: false,
            browser: "chrome",
            watchOptions: {
                ignoreInitial: true,
                ignored: /node_modules/
            }
        },{ reload: false })
    ]
});