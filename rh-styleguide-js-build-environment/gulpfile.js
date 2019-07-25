const { watch, src, series, dest } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('gulp-replace');

// gulp-sass - Using for forwards-compatibility and explicitly
sass.compiler = require('node-sass');

// Get configs from a JSON file
const { localServer, codeBase, development, production } = require('./devenv.config.json');
const { devPath, cssDevPath, scssDevPath, jsDevPath, jsDevEntryPoints, htmlDevPath } = development;
const { publicPath, jsPublicPath, cssPublicPath, bundleName, neededDirectories } = production;

// Dev server
function dev_server(cb) {
    const { port, staticExtensions } = localServer;

    browserSync.init({
        browser: "chrome",
        port: port,
        open: false,
        notify: false,
        server: {
            baseDir: devPath,
            serveStaticOptions: {
                extensions: staticExtensions
            },
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: /node_modules/
        }
    });

    watch(codeBase).on('change', browserSync.reload); // Watching *.php files for reloading
    watch(scssDevPath, series(compile_scss)); // Watching SCSS files for CSS injecting

    cb();
}

// Test server
function test_server(cb) {
    const { port, staticExtensions } = localServer;

    browserSync.init({
        browser: "chrome",
        port: port,
        open: false,
        notify: false,
        server: {
            baseDir: publicPath,
            serveStaticOptions: {
                extensions: staticExtensions
            },
        }
    });

    cb();
}

function compile_scss(cb) {
    src(scssDevPath)
        .pipe(sass())
        .pipe(dest(cssDevPath))
        .pipe(browserSync.stream({
            match: "**/*.css"
        }));

    cb();
}

/* Build process */
/**
 * The function will be bundle all CSS files into the file bundle.css
 * @param {callback} cb
 */
function build_scss(cb) {
    let isSuccess = true;
    const cssFullFilename = `${bundleName}.css`;

    src(scssDevPath)
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({ outputStyle: 'compressed' })
                .on('error', sass.logError)
        )
        .pipe(concat(cssFullFilename))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(cssPublicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Bundle successfully SCSS files into \x1b[90m${cssPublicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not bundle SCSS files.');
            }
        });

    cb();
}

/**
 * All JS entries will be bundled into the file bundle.min.js
 * The bundle should be compatible with IE11, Chrome, Firefox,...
 * Developer can using ES6 and import/ export syntax. It will be easier to share and reuse JS code.
 * It compiles ES6 to ES5.
 * @param {callback} cb
 */
function build_js(cb) {
    let isSuccess = true;
    const jsEntries = jsDevEntryPoints.map((entry) => `${jsDevPath}/${entry}`);
    const jsFullFilename = `${bundleName}.js`;

    browserify({
        entries: jsEntries,
        extensions: ['.js'],
        debug: true
    })
        .transform(babelify, {
            presets: ["@babel/preset-env"],
            plugins: ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties']
        })
        .bundle()
        .pipe(source(jsFullFilename))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(minify({
            noSource: true,
            ext: { min: '.min.js' }
        }))
        .pipe(sourcemaps.write("."))
        .pipe(dest(jsPublicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Bundle successfully JS files into \x1b[90m${jsPublicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not bundle JS files.');
            }
        });

    cb();
}

function copyHtmlFiles(cb) {
    let isSuccess = true;

    src(htmlDevPath)
        .pipe(dest(publicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Copy successfully HTML files into \x1b[90m${publicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not copy HTML files.');
            }
        });
    cb();
}

function copyOtherDirectories(cb) {
    let isSuccess = true;
    src(neededDirectories, { base: devPath })
        .pipe(dest(publicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Copy successfully needed directories into \x1b[90m${publicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not copy needed directories.');
            }
        });

    src('src/app.config.json')
        .pipe(replace('development', 'production'))
        .pipe(dest(publicPath));

    cb();
}

exports.default = dev_server;
exports.build = series(build_scss, build_js, copyHtmlFiles, copyOtherDirectories);
exports.test = test_server;
