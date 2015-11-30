'use strict';

var taskName = 'wendy';
var taskDescription = 'CasperJs test runner';

var async                = require('async');
var getFilepaths         = require('./lib/getFilepaths.js');
var filepathIterator     = require('./lib/filepathIterator.js');
var formatter            = require('./lib/formatter.js');
var logAggregatedResults = require('./lib/logAggregatedResults.js');

module.exports = function wendyModule(grunt) {
  // Outside of the task scope so we can aggregate across entire task queue
  grunt.registerMultiTask(taskName, taskDescription, function wendyTask() {
    var done = this.async();

    var options = this.options({
      phantom:     null,
      async:       'eachSeries',
      spawnOpts:   null,
      cli:         [],
      runner:      'test',
      formatter:   formatter,
      formatterOptions: {
        whitespace: true,
        filter: null
      },
      fail:        ['failed'],
      warn:        ['dubious', 'skipped'],
      _aggregated: {}
    });

    if (!options.phantom) {
      try {
        options.phantom = require('phantomjs').path;
      }
      catch (e) {
        throw new Error('PhantomJS binary not found.');
      }
    }

    process.env['PHANTOMJS_EXECUTABLE'] = options.phantom;

    // Iterate over all specified file groups.
    var filepaths = getFilepaths(grunt, this.files)

    // Async start up casper processes
    var asyncFn = async[options.async];
    var asyncDone = function asyncDone(err, res) {
      logAggregatedResults(grunt, options._aggregated);

      var isSuccess = true;
      options.fail.forEach(function (key) {
        if (options._aggregated[key]) {
          isSuccess = false;
          grunt.log.writeln();
          grunt.log.error('[ERROR] There were tests with a status of ' + key);
        }
      });

      options.warn.forEach(function (key) {
        if (options._aggregated[key]) {
          grunt.log.writeln();
          grunt.log.error('[WARNING] There were tests with a status of ' + key);
        }
      });

      done(isSuccess); // grunt done
    };
    asyncFn(filepaths, filepathIterator(grunt, options), asyncDone);
  });

};
