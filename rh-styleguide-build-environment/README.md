# The Styleguide development environment
The project is using for front-end developers who use it to create UI components. It's simpler, faster and more effective for development and testing before a component is implemented into the Styleguide application.

The project is using:
* React Hooks
* SASS
* Handlesbars for HTML template.
* Babel
* ESLint
* Webpack and Webpack Dev Server (with HMR)
* BrowserSync for synchronised browser testing.
* BrowserStack.com for testing on multiple OS and devices.
* Netlify.com for online demo.
* [code-template-generator](https://www.npmjs.com/package/code-template-generator).
* ... many more in `package.json`...

## Usage
* Clone the repo and choose a right branch by the command `$ git fetch` ;-)
* Run `npm install` to install all needed dependencies.
* View the file `/webpack.custom.js` to know more about the local web server and change the port for your reasons.
* Run the commands:
    * `npm start` - Starts the local web server at `http://localhost:3000`.
    * `npm run bs` - Starts the local web server with BrowserSync at `http://localhost:3030`.
    * `npm run build` - Bundles the app to production on local.
    * `npm run deploy` - Deploys to Netlify (draft version).
    * `npm run publish` - Deploy to Netlify (production - live).

[![Browserstack](./src/images/Browserstack-logo.svg)](https://www.browserstack.com)