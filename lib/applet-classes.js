var miniClass = require('./mini-class');
var SensorApplet = require('./sensor-applet');

module.exports = {
  GoIO: miniClass.extendClass(SensorApplet, {
    deviceType: 'golink',
    deviceSpecificJarUrls: [
      'org/concord/sensor/sensor-vernier/sensor-vernier.jar',
      'org/concord/sensor/goio-jna/goio-jna.jar'
    ]
  }),

  LabQuest: miniClass.extendClass(SensorApplet, {
    deviceType: 'labquest',
    deviceSpecificJarUrls: [
      'org/concord/sensor/sensor-vernier/sensor-vernier.jar',
      'org/concord/sensor/labquest-jna/labquest-jna.jar'
    ]
  })
};
