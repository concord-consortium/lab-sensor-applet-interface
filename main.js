var appletClasses = require('./lib/applet-classes');
var errors = require('./lib/errors');

module.exports = {
  GoIO:                      appletClasses.GoIO,
  LabQuest:                  appletClasses.LabQuest,

  // Listing of supported sensors. You need to set the measurementType on a SensorApplet instance
  // before calling append. The keys of the sensorDefinitions map are the supported
  // measurementType values.
  sensorDefinitions:         require('./lib/sensor-definitions'),
  unitsDefinition:           require('./lib/units-definition'),

  // Error Classes. These are returned to appendCallback or thrown by some of the API methods.
  JavaLoadError:             errors.JavaLoadError,
  AppletInitializationError: errors.AppletInitializationError,
  SensorConnectionError:     errors.SensorConnectionError,
  AlreadyReadingError:       errors.AlreadyReadingError
};
