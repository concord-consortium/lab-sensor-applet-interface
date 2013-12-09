var miniClass = require('./mini-class');
var SensorApplet = require('./sensor-applet');

module.exports = {
  GoIO: miniClass.extendClass(SensorApplet, {
    deviceType: 'golink',
    deviceSpecificJars: [ 'sensor-vernier', 'goio-jna']
  }),

  LabQuest: miniClass.extendClass(SensorApplet, {
    deviceType: 'labquest',
    deviceSpecificJars: [ 'sensor-vernier', 'labquest-jna']
  })
};
