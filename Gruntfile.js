'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    wendy: {
      options: {
        cli: ["--foo=bar"]
      },
      twotests: ['test/a*.js'],
      twomore: ['test/b*.js'],
    },

  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['wendy']);

  grunt.registerTask('default', ['eslint', 'test']);

};
