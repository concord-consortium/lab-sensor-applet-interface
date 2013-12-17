module.exports = {
  goMotion: {
    appletClass: 'GoIO',

    // Name of the measurement being made, for display in UI
    measurementName: "Distance",

    // measurement type, as accepted by applet's getSensorRequest method
    measurementType: 'distance',

    // measurement type, as returned by getTypeConstantName method.
    // The returned values are taken from the QUANTITY_* constants in the sensor project
    // See https://github.com/concord-consortium/sensor/blob/2da0693e4d92d8c107be802f29eab2688a83b26b/src/main/java/org/concord/sensor/SensorConfig.java
    typeConstantName: 'distance',

    // fully specified, readable name of the sensor: e.g., "GoIO pH Sensor"
    sensorName: "GoMotion",

    // readable name of the interface device the sensor connects to, e..g, "GoIO"
    deviceName: "GoMotion",

    samplesPerSecond: 20,
    tareable: true,
    minReading: 0,
    maxReading: 4,
    precision: 2,
    maxSeconds: 20
  },

  goTemp: {
    appletClass: 'GoIO',
    measurementName: "Temperature",
    measurementType: 'temperature',
    // QUANTITY_TEMPERATURE
    typeConstantName: 'temperature_wand',
    sensorName: "GoIO Temperature Sensor",
    deviceName: "GoIO",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 40,
    maxSeconds: 20
  },

  goLinkTemperature: {
    appletClass: 'GoIO',
    measurementName: "Temperature",
    measurementType: 'temperature',
    // QUANTITY_TEMPERATURE
    typeConstantName: 'temperature',
    sensorName: "GoIO Temperature Sensor",
    deviceName: "GoIO",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 40,
    maxSeconds: 20
  },

  goLinkLight: {
    appletClass: 'GoIO',
    measurementName: "Light Intensity",
    measurementType: 'light',
    // QUANTITY_LIGHT
    typeConstantName: 'light',
    sensorName: "GoIO Light Sensor",
    deviceName: "GoIO",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 2000,
    maxSeconds: 20
  },

  goLinkForce: {
    appletClass: 'GoIO',
    measurementName: "Force",
    measurementType: 'force',
    // QUANTITY_FORCE
    typeConstantName: 'force',
    sensorName: "GoIO Force Sensor",
    deviceName: "GoIO",
    samplesPerSecond: 20,
    tareable: true,
    minReading: -50,
    maxReading: 50,
    precision: 2,
    maxSeconds: 10
  },

  goLinkPH: {
    appletClass: 'GoIO',
    measurementName: "Acidity",
    measurementType: 'ph',
    // QUANTITY_PH
    typeConstantName: 'ph',
    sensorName: "GoIO pH Sensor",
    deviceName: "GoIO",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 14,
    maxSeconds: 60
  },

  goLinkCO2: {
    appletClass: 'GoIO',
    measurementName: "CO₂ Concentration",
    measurementType: 'co2',
    // QUANTITY_CO2_GAS
    typeConstantName: 'co2_gas',
    sensorName: "GoIO CO₂ sensor",
    deviceName: "GoIO",
    samplesPerSecond: 1,
    tareable: false,
    minReading: 0,
    maxReading: 5000,
    maxSeconds: 60
  },

  goLinkO2: {
    appletClass: 'GoIO',
    measurementName: "O₂ Concentration",
    measurementType: 'o2',
    // QUANTITY_OXYGEN_GAS
    typeConstantName: 'oxygen_gas',
    sensorName: "GoIO O₂ sensor",
    deviceName: "GoIO",
    samplesPerSecond: 1,
    tareable: false,
    minReading: 0,
    maxReading: 100,
    maxSeconds: 60
  },

  labQuestMotion: {
    appletClass: 'LabQuest',
    measurementName: "Distance",
    measurementType: 'distance',
    // QUANTITY_DISTANCE
    typeConstantName: 'distance',
    sensorName: "LabQuest Motion Sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 20,
    tareable: true,
    minReading: 0,
    maxReading: 4,
    precision: 2,
    maxSeconds: 20
  },

  labQuestTemperature: {
    appletClass: 'LabQuest',
    measurementName: "Temperature",
    measurementType: 'temperature',
    // QUANTITY_TEMPERATURE
    typeConstantName: 'temperature',
    sensorName: "LabQuest Temperature Sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 40,
    maxSeconds: 20
  },

  labQuestLight: {
    appletClass: 'LabQuest',
    measurementName: "Light Intensity",
    measurementType: 'light',
    // QUANTITY_LIGHT
    typeConstantName: 'light',
    sensorName: "LabQuest Light Sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 2000,
    maxSeconds: 20
  },

  labQuestForce: {
    appletClass: 'LabQuest',
    measurementName: "Force",
    measurementType: 'force',
    // QUANTITY_FORCE
    typeConstantName: 'force',
    sensorName: "LabQuest Force Sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 20,
    tareable: true,
    minReading: -50,
    maxReading: 50,
    precision: 2,
    maxSeconds: 10
  },

  labQuestPH: {
    appletClass: 'LabQuest',
    measurementName: "Acidity",
    measurementType: 'ph',
    // QUANTITY_PH
    typeConstantName: 'ph',
    sensorName: "LabQuest pH Sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 10,
    tareable: false,
    minReading: 0,
    maxReading: 14,
    maxSeconds: 60
  },

  labQuestCO2: {
    appletClass: 'LabQuest',
    measurementName: "CO₂ Concentration",
    measurementType: 'co2',
    // QUANTITY_CO2_GAS
    typeConstantName: 'co2_gas',
    sensorName: "LabQuest CO₂ sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 1,
    tareable: false,
    minReading: 0,
    maxReading: 5000,
    maxSeconds: 60
  },

  labQuestO2: {
    appletClass: 'LabQuest',
    measurementName: "O₂ Concentration",
    measurementType: 'o2',
    // QUANTITY_OXYGEN_GAS
    typeConstantName: 'oxygen_gas',
    sensorName: "LabQuest O₂ sensor",
    deviceName: "LabQuest",
    samplesPerSecond: 1,
    tareable: false,
    minReading: 0,
    maxReading: 100,
    maxSeconds: 60
  }
};
