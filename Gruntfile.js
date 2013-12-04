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
    },
    copy: {
      dist: {
      	src: 'examples/**',
      	dest: 'dist/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['browserify', 'copy']);
};