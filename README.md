## Lab Sensor Applet Interface

This repository contains a Javascript wrapper for the the Concord Consortium's [applet interface to Vernier sensors](https://github.com/concord-consortium/sensor-applets). 

It should be compatible with the latest (November 2013) security restrictions on Java applets in the browser.

It was extracted from the [Lab project](http://github.com/concord-consortium/lab).

### Using the interface

You can either use this repository and build before using it, or you can use the [distribution
repository](http://github.com/concord-consortium/lab-sensor-applet-interface-dist)
which contains the built files. Each approach has its own advantages and disadvantages.

To use this repository, here is what you need to do:

1. Include this project as a submodule or add it as a Bower dependency.
2. Build the project (see below)
3. Use the built file `dist/sensor-applet-interface.js` in your project.
4. In an AMD environment,
 `require(<path-to-sensor-applet-interface.js>, function(sensorAppletInterface) { ... });` (or simply add the path to the appropriate config file if using the RequireJS optimizer with the Simplified CommonJS wrapper, as in Lab.)
5. Or simply use the `sensorAppletInterface` global.
6. Make sure your project exposes jQuery as the global `$`. This project depends on jQuery but does not attempt to include it as an explicit dependency.

### Building the Project

To generate `dist/sensor-applet-interface.js`:

1. install the dependencies: `npm install`
2. build it: `npm run build`

The build is done with [Grunt](http://gruntjs.com/getting-started)). You can use grunt directly for more control.

### Running the examples and changing the code

To run the examples:

1. install the dependencies: `npm install`
2. run a dev server: `npm run serve`
3. open your web browser to [http://localhost:9966/examples/]

In this mode you can make changes to the files in `lib` and your changes will be reflected when reloading the pages.
We are using [Beefy](http://didact.us/beefy/) for this, it has more advanced features you might like.

### Deploy to dist repository

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