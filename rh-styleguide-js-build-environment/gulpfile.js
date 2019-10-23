const { watch, src, series, dest } = require('gulp');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const browserify = require('browserify');
const babelify = require('babelify');
const minify = require('gulp-minify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const globby = require('globby');

const fs = require('fs');

// gulp-sass - Using for forwards-compatibility and explicitly
sass.compiler = require('node-sass');

// Get configs from a JSON file
const { localServer, codeBase, development, production } = require('./devenv.config.json');
const { devPath, cssDevPath, scssDevPath, jsDevPath, htmlDevPath } = development;
const { publicPath, jsPublicPath, cssPublicPath, bundleName, neededDirectories } = production;

// Dev server
function devServer(cb) {
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
            ignored: /node_modules|public/
        }
    });

    watch(codeBase).on('change', browserSync.reload); // Watching other file types for reloading
    watch(scssDevPath, series(compile_scss)); // Watching SCSS files for CSS injecting

    cb();
}

// Test server
function testServer(cb) {
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
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: /node_modules|src/
        }
    });

    watch([`${publicPath}/**/*`]).on('change', browserSync.reload);

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
function scssBuild(cb) {
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

function jsBuild(cb) {
    let isSuccess = true;
    const jsFullFilename = `${bundleName}.js`;

    src(jsDevPath)
        .pipe(sourcemaps.init())
        .pipe(concat(jsFullFilename))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(jsPublicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Build successfully JS files into \x1b[90m${jsPublicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not build JS files.');
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
function jsMinify(cb) {
    const jsFullFilename = `${bundleName}.js`;

    globby(jsDevPath)
        .then((jsEntries) => {
            let isSuccess = true;

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
                        console.log(`\n\x1b[32m√ Done!\x1b[0m Bundle successfully JS files in \x1b[90m${jsPublicPath}\x1b[0m.`);
                    } else {
                        console.error('\n\x1b[31m✗ Error!\x1b[0m Can not bundle JS files.');
                    }
                });
        })
        .catch((error) => console.error(error));

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

    cb();
}

function copyAppConfigFile(cb, modeEnv = 'production') {
    const appConfigFile = `${devPath}/app.config.json`;
    const appConfigFilePublic = `${publicPath}/app.config.json`;

    !fs.existsSync(publicPath) && fs.mkdirSync(publicPath);

    if (fs.existsSync(appConfigFile)) {
        fs.readFile(appConfigFile, (err, data) => {
            if (err) throw err;

            const appConfigData = JSON.parse(data) || {};
            const newData = Object.assign(appConfigData, { environment: modeEnv });
            const newConfig = JSON.stringify(newData, null, 2);

            newConfig &&
                fs.existsSync(publicPath) &&
                fs.writeFile(appConfigFilePublic, newConfig, (err) => {
                    if (err) throw err;
                    console.log(`\n\x1b[32m√ Done!\x1b[0m Copy successfully the config file to \x1b[90m${appConfigFilePublic}\x1b[0m.`);
                });
        });
    }

    cb();
}

function copyAppConfigForBuild(cb) {
    copyAppConfigFile(cb, 'build');
    cb();
}

function copyAppConfigForProduction(cb) {
    copyAppConfigFile(cb, 'production');
    cb();
}

exports.default = devServer;
exports.testsrv = testServer;

exports.buildcode = series(scssBuild, jsBuild);
exports.minifycode = series(scssBuild, jsMinify);

exports.build = series(scssBuild, jsBuild, copyHtmlFiles, copyOtherDirectories, copyAppConfigForBuild);
exports.publish = series(scssBuild, jsMinify, copyHtmlFiles, copyOtherDirectories, copyAppConfigForProduction);
