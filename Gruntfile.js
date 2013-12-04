module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      options: {
        standalone: 'sensor-applet-interface'
      },
      dist: {
      	src: 'main.js',
      	dest: 'dist/sensor-applet-interface.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};