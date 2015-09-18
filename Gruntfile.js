'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      parallel: {},
      series: {}
    },

    eslint: {
      gruntfile: ['Gruntfile.js'],
      task: ['tasks/wendy.js']
    },

    mdlint: {
      readme: ['README.md']
    },

    // Configuration to be run (and then tested).
    wendy: {
      options: {
        cli: ['--foo=bar']
      },
      twotests: ['test/a*.js'],
      twomore: ['test/b*.js'],
      parallel: {
        options: {
          async: 'each',
          cli: ['--foo=bar']
        },
        files: { src: ['test/a*.js'] }
      },
      dubious: {
        files: { src: ['test/c*.js'] }
      },
      fail: {
        files: { src: ['test/d*.js'] }
      }
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mdlint');

  grunt.registerMultiTask('test', function () {
    if (this.target === 'series') {
      grunt.task.run(['wendy:twotests', 'wendy:twomore']);
    }
    else if (this.target === 'parallel') {
      grunt.task.run(['wendy:parallel']);
    }
  });

  grunt.registerTask('lint', ['eslint', 'mdlint']);

  grunt.registerTask('default', ['lint', 'test']);

};
