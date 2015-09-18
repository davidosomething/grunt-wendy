'use strict';

var taskName = 'wendy';
var taskDescription = 'CasperJs test runner';

var async                = require('async');
var phantomBinPath       = require('phantomjs').path;
var getFilepaths         = require('./lib/getFilepaths.js');
var filepathIterator     = require('./lib/filepathIterator.js');
var formatter            = require('./lib/formatter.js');
var logAggregatedResults = require('./lib/logAggregatedResults.js');

// phantom settings
process.env['PHANTOMJS_EXECUTABLE'] = phantomBinPath;

module.exports = function wendyModule(grunt) {
  // Outside of the task scope so we can aggregate across entire task queue
  grunt.registerMultiTask(taskName, taskDescription, function wendyTask() {
    var done = this.async();
    var options = this.options({
      async:     'eachSeries',
      clean:     true,
      cli:       [],
      runner:    'test',
      formatter: formatter,
      _aggregated: {}
    });

    // Iterate over all specified file groups.
    var filepaths = getFilepaths(grunt, this.files)

    // Async start up casper processes
    var asyncFn = async[options.async];
    var asyncDone = function asyncDone(err, res) {
      logAggregatedResults(grunt, options._aggregated);
      done(); // grunt done
    };
    asyncFn(filepaths, filepathIterator(grunt, options), asyncDone);
  });

};
