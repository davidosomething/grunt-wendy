'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        createTag: false,
        push: false,
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    test: {
      series: {},
      parallel: {},
      parallelFiltered: {},
      nofail: {},
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
      parallelFiltered: {
        options: {
          async: 'each',
          cli: ['--foo=bar'],
          formatterOptions: {
            whitespace: true,
            filter: /(Test file:)|(tests executed)/
          }
        },
        files: { src: ['test/a*.js'] }
      },
      dubious: { // don't fail
        options: {
          fail: [],
          warn: ['dubious', 'failed']
        },
        files: { src: ['test/c*.js'] }
      },
      fail: { // don't fail
        options: {
          fail: [],
          warn: ['dubious', 'failed']
        },
        files: { src: ['test/d*.js'] }
      }
    },

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mdlint');

  grunt.registerMultiTask('test', function () {
    if (this.target === 'series') {
      grunt.task.run(['wendy:twotests', 'wendy:twomore']);
    }
    else if (this.target === 'parallel') {
      grunt.task.run(['wendy:parallel']);
    }
    else if (this.target === 'parallelFiltered') {
      grunt.task.run(['wendy:parallelFiltered']);
    }
    else if (this.target === 'nofail') {
      grunt.task.run(['wendy:dubious', 'wendy:fail']);
    }
  });

  grunt.registerTask('lint', ['eslint', 'mdlint']);

  grunt.registerTask('default', ['lint', 'test']);

};
