module.exports = {
    entryPoints: {
        // index is default and you can add many more entry points here
        index: './src/index.js'
    },
    htmlTemplate: './src/index.html',
    distDir: './dist', // Distribution directory
    host: 'localhost',
    serverPort: 3060, // Local Webpack Dev Server port (main)
    browserSyncPort: 3061 // BrowserSync port (only for using BrowserSync)
};