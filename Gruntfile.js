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
    },
    connect: {
      dev: {
      	options: {
          keepalive: true,
          base: 'dist',
          port: '8000',
          open: 'http://localhost:<%=connect.dev.options.port%>/examples/'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['browserify', 'copy']);
};