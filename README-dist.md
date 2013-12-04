## Lab Sensor Applet Interface

This repository contains a Javascript wrapper for the the Concord Consortium's [applet interface to Vernier sensors](https://github.com/concord-consortium/sensor-applets). 

It should be compatible with the latest (November 2013) security restrictions on Java applets in the browser.

It was extracted from the [Lab project](http://github.com/concord-consortium/lab).

### Using the interface

1. Include this project as a submodule, or add it as a Bower or npm dependency.
2. Use the file `sensor-applet-interface.js` in your project.
3. In an AMD environment,
 `require(<path-to-sensor-applet-interface.js>, function(sensorAppletInterface) { ... });` (or simply add the path to the appropriate config file if using the RequireJS optimizer with the Simplified CommonJS wrapper, as in Lab.)
4. Or simply use the `sensorAppletInterface` global.
5. Make sure your project exposes jQuery as the global `$`. This project depends on jQuery but does not attempt to include it as an explicit dependency.

### Building the Project

This repository is the distribution repository for the [Lab Sensor Applet Interface](http://github.com/concord-consortium/lab-sensor-applet-interface).
To modify the files of this repository, you should clone the source repository, and follow the directions there.
