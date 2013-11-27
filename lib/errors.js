'use strict';

var util = require('util');

function errorConstructor(message) {
  /*jshint validthis: true*/
  Error.call(this); //super constructor
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
  }

  this.name = this.constructor.name; //set our function’s name as error name.
  this.message = message; //set the error message
}

function JavaLoadError() {
  errorConstructor.apply(this, arguments);
}
util.inherits(JavaLoadError, Error);

function AppletInitializationError() {
  errorConstructor.apply(this, arguments);
}
util.inherits(AppletInitializationError, Error);

function SensorConnectionError() {
  errorConstructor.apply(this, arguments);
}
util.inherits(SensorConnectionError, Error);

function AlreadyReadingError() {
  errorConstructor.apply(this, arguments);
}
util.inherits(AlreadyReadingError, Error);

module.exports = {
  JavaLoadError: JavaLoadError,
  AppletInitializationError: AppletInitializationError,
  AlreadyReadingError: AlreadyReadingError,
  SensorConnectionError: SensorConnectionError
};
