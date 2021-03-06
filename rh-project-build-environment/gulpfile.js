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

// gulp-sass - Using for forwards-compatibility and explicitly
sass.compiler = require('node-sass');

// Get configs from a JSON file
const { localServer, codeBase, development, production } = require('./devenv.config.json');
const { cssDevPath, scssDevPath, jsDevPath } = development;
const { jsPublicPath, cssPublicPath, bundleName, bundleVersion } = production;

// Dev server
function devServer(cb) {
    browserSync.init({
        proxy: localServer.proxy, // Backend server
        browser: "chrome",
        port: localServer.port, // Frontend server
        open: false,
        notify: false,
        watchOptions: {
            ignoreInitial: true,
            ignored: /node_modules|vendor|wp|plugins|mu-plugins|uploads|config|datafilter|languages/
        }
    });

    watch(codeBase).on('change', browserSync.reload); // Watching files at "codeBase" for reloading
    watch(scssDevPath, series(scssCompilation)); // Watching SCSS files for CSS injecting

    cb();
}

function scssCompilation(cb) {
    const cssFilename = `${bundleName}.css`;

    src(scssDevPath)
        .pipe(
            sass.sync()
                .on('error', (err) => console.error(`\n\x1b[31m✗ Error!\x1b[0m\n${err.message}`))
        )
        .pipe(concat(cssFilename))
        .pipe(dest(cssDevPath))
        .pipe(browserSync.stream({ match: "**/*.css" }))
        .on('error', (err) => console.error(`\n\x1b[31m✗ Error!\x1b[0m\n${err.message}`));

    cb();
}

/* Build process */
/**
 * The function will be bundle all CSS files into the file bundle.css
 * @param {callback} cb
 */
function scssBuild(cb) {
    let isSuccess = true;
    const cssFullFilename = `${bundleName}-${bundleVersion}.css`;

    src(scssDevPath)
        .pipe(sass.sync().on('error', (err) => console.error(`\n ${err.message}`)))
        .pipe(concat(cssFullFilename))
        .pipe(dest(cssPublicPath))
        .on('error', (err) => {
            isSuccess = false;
            console.error(`\n ${err.message}`);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Build successfully SCSS files in \x1b[90m${cssPublicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not build SCSS files.');
            }
        });

    cb();
}

function scssMinify(cb) {
    let isSuccess = true;
    const cssFullFilename = `${bundleName}.${bundleVersion}.min.css`;

    src(scssDevPath)
        .pipe(sourcemaps.init())
        .pipe(
            sass.sync({ outputStyle: 'compressed' })
                .on('error', (err) => console.error(`\n ${err.message}`)))
        .pipe(concat(cssFullFilename))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(cssPublicPath))
        .on('error', (error) => {
            isSuccess = false;
            console.error(error);
        })
        .on('end', () => {
            if (isSuccess) {
                console.log(`\n\x1b[32m√ Done!\x1b[0m Bundle successfully SCSS files in \x1b[90m${cssPublicPath}\x1b[0m.`);
            } else {
                console.error('\n\x1b[31m✗ Error!\x1b[0m Can not bundle SCSS files.');
            }
        });

    cb();
}

function jsBuild(cb) {
    let isSuccess = true;
    const jsFullFilename = `${bundleName}-${bundleVersion}.js`;

    src(jsDevPath)
        .pipe(concat(jsFullFilename))
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
 * All JS entries will be bundled and minified into a file *.min.js
 * The minified JS should be compatible with IE11, Chrome, Firefox,...
 * Developer can using ES6 and import/ export syntax. It will be easier to share and reuse JS code.
 * It compiles ES6 to ES5.
 * @param {callback} cb
 */
function jsMinify(cb) {
    const jsFullFilename = `${bundleName}.${bundleVersion}.min.js`;

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
                    ext: { min: '.js' }
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

function help(cb) {
    const helpInformation = `USAGE:
        \n\t\x1b[36mgulp \x1b[0m\n\t   Starts the local server at http://localhost:${localServer.port}
        \n\t\x1b[36mgulp build\x1b[0m\n\t   Bundles CSS and JS for production \x1b[90m(*.bundle.*)\x1b[0m
        \n\t\x1b[36mgulp minify\x1b[0m\n\t   Minifies CSS and JS for production \x1b[90m(*.min.*)\x1b[0m
        \n\t\x1b[36mgulp all\x1b[0m\n\t   Bundles and minifies CSS and JS for production
        \n\t\x1b[36mgulp help\x1b[0m\n\t   View the help information
    `;

    console.log(helpInformation);

    cb();
}

exports.default = devServer;
exports.build = series(scssBuild, jsBuild);
exports.minify = series(scssMinify, jsMinify);
exports.all = series(scssBuild, jsBuild, scssMinify, jsMinify);
exports.help = help;
