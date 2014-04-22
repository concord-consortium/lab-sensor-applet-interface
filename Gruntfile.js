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
          {src: 'lib/README-dist.md', dest: '<%= distPath %>/README.md'},
          {src: 'lib/LICENSE-dist', dest: '<%= distPath %>/LICENSE'}
      	]
      }
    },
    connect: {
      dev: {
      	options: {
          keepalive: true,
          base: 'dist',
          port: '8000',
          open: 'http://localhost:<%=connect.dev.options.port%>/examples/',
          hostname: '*'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['browserify', 'copy']);
};