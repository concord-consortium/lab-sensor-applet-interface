## Lab Sensor Applet Interface

This repository contains a Javascript wrapper for the the Concord Consortium's
[applet interface to Vernier sensors](https://github.com/concord-consortium/sensor-applets).
It should be compatible with the latest (November 2013) security restrictions on Java applets in the browser.
It was extracted from the [Lab project](http://github.com/concord-consortium/lab).

### Using the interface

1. Include this project as a submodule or add it as a Bower dependency.
2. Build the project (see below)
3. Use the built file `dist/sensor-applet-interface.js` in your project.
4. In an AMD environment,
 `require(<path-to-sensor-applet-interface.js>, function(sensorAppletInterface) { ... });` (or simply add the path to the appropriate config file if using the RequireJS optimizer with the Simplified CommonJS wrapper, as in Lab.)
5. Or simply use the `sensorAppletInterface` global.
6. Make sure your project exposes jQuery as the global `$`. This project depends on jQuery but does not attempt to include it as an explicit dependency.

You can skip building by using the [distribution
repository](http://github.com/concord-consortium/lab-sensor-applet-interface-dist) instead.

### Building the Project

1. install the dependencies: `npm install`
2. build or fetch the jars (see below)
3. build it: `npm run build`

#### Fetch the jars from the dist repository

1. git clone git://github.com/concord-consortium/lab-sensor-applet-interface-dist.git dist
2. cp jars/config.sample.yml jars/config.yml
3. jars/update-timestamp.rb

#### Build the jars

1. cd jars
2. ./build-jars.rb
3. ./update-timestamp.rb

Note these scripts require ruby 2.0, the .ruby-version file in the jars folder will take care of this
if you have rvm or rbenv setup.

### Running the examples and changing the code

1. build project (see above)
2. if you haven't already, install the grunt command line: `sudo npm install -g grunt-cli`
3. run a dev server and open browser: `grunt connect`
4. make a change to a js file
5. rebuild built project: `npm run build`
6. reload the page in the browser

### Deploy dist repository

One time setup

    rm dist
    git clone git@github.com:concord-consortium/lab-sensor-applet-interface-dist.git dist

Each deploy

    npm run build
    cd dist
    git add -A
    git commit -m "some interesting message about the deploy"
    git push origin master
    git push origin master:gh-pages