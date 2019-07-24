# The front-end development environment - DevEnv
The simple front-end development environment that is using together with back-end code (example: PHP, .NET,...).

The project template is using a specific structure that's why it's only using for RH organization. You should __NOT__ using this repo if you don't know what you need.

## Features
* Whenever you make a change in your code:
   * Styling - [SASS + CSS injecting](https://www.browsersync.io/docs/gulp#gulp-sass-css):
      * SCSS is compiled to CSS.
      * Hot Module Replacement (HMR) without reloading the page.
   * Code (Ex: *.php):
      * Automatic reloading the page.
* Build the minification production for both CSS and JS.
* JavaScript:
   * Support ES6 and `import/ export` syntax for using on IE11.
   * All entry points is bundled into a file and it should work on many web browsers (IE11, Chrome, Safari, Firefox, ...)
* Configuration for the local front-end web server is simple and flexible.

## System requirements
* Administrator permission is required by your operating system for the installation.
* The minimum supported [Node.js](https://nodejs.org/) version is 8.3.0 (Node.js LTS version is a good choice for the stability).
* [Gulp](https://gulpjs.com/) is installled on global.
* [WAMP](http://www.wampserver.com/en/) is using for back-end system (PHP, Apache, MySQL, ...) or using other back-end server (example: IIS,...)

## Project structure
|Location|Description|
|---|---|
|`/web`|Your website's location (Ex: PHP code).|
|`/web/app`|Back-end code|
|`/web/_dev`|Your front-end code that is only using for the development.|
|`/web/include/scripts`|JS files will be compiled into the directory for the production|
|`/web/include/styles`|SCSS files will be compiled to CSS into the directory for the production|
|`/devenv.config.json`|Configuration for the local front-end web server|

## Using
1. Pull the repo and choose a right branch by the command `$ git fetch` ;-)
2. Run `npm install` to install all needed dependencies.
3. Change the config file `/devenv.config.json` for your reason.
4. Start the local back-end web server (Ex: WAMP).
5. The local front-end web server:
   * Run `$ gulp` to start the server at `http://localhost:3000/`.
   * Run `$ gulp build` to bundle your code (SCSS, JS).

__TIPS__! You can also using the commands:
* `npm start`
* `npm run build`