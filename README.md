# Flux app starter

Basic foundation for building Flux apps. Customize to suit the specific app, adding, removing, and updating npm deps as necessary.

This structure assumes you'll have logged in and logged out views, such as landing pages, pre-signup pages, etc, in your app.


### Basic structure and tooling:

* Flux
* React
* BabelJS
* Browserify (webpack version forthcoming)
* Axios for making requests
* react-bootstrap (optional, but removal will require changes to signup.js page)
* SCSS compiled via node-sass
* sourcemap generation via exorcist for optimal Chrome debugging
* envify for managing environments
* uglification and minification of js/css
* testing (TBD -- my preference is to unit test via Mocha/Chai with Istanbul for coverage. However, this template uses ES6, which Istanbul isn't able to handle.) TODO(): This may have changed. See [this](http://stackoverflow.com/questions/30540147/using-istanbul-and-mocha-to-cover-es6-code) and [this](http://onsen.io/blog/mocha-chaijs-unit-test-coverage-es6/) for Istanbul/ES6 workarounds.


### Comes with...

* signup page
* login (WIP)
* homepage
* basic routes setup
* session store/actions/api
* account store/actions/api


### Status: WIP -- should be useful, but also 

### Licence: This project is licensed under the terms of the MIT license.
