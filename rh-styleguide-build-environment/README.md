# The Styleguide build environment
The project is using for front-end developers who use it to create UI components in the Styleguide application. It's simpler, faster and more effective for development and testing before a component is implemented into the Styleguide application.

The project template is using a specific structure that's why it's only using for RH organization. You should __NOT__ using this repo if you don't know what you need.

It's using:
* SCSS
* Handlesbars.js
* React Hooks
* Netlify.com for deployment.
* [code-template-generator](https://www.npmjs.com/package/code-template-generator) for the React project template.

## Usage
* Clone the repo and choose a right branch by the command `$ git fetch` ;-)
* Run `npm install` to install all needed dependencies.
* View the file `/webpack.custom.js` to know more about the local web server and change the port for your reasons.
* Run `npm start` to start the local web server at `http://localhost:3030`.
* Run `npm run build` to build the app to the production.