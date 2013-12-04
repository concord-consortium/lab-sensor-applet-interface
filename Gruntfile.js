module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    distPath: 'dist',
    browserify: {
      options: {
        standalone: 'sensor-applet-interface'
      },
      dist: {
      	src: 'main.js',
      	dest: '<%= distPath %>/sensor-applet-interface.js'
      }
    },
    copy: {
      dist: {
      	files: [
          {src: 'examples/**', dest: '<%= distPath %>/'},
          {src: 'README-dist.md', dest: '<%= distPath %>/README.md'}
      	]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['browserify', 'copy']);
};