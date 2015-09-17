'use strict';

var taskName = 'wendy';
var taskDescription = 'CasperJs test runner';

var async = require('async');
var getCasperBinary = require('./lib/getCasperBinary.js');
var parseCasperOutput = require('./lib/parseCasperOutput.js');
var logAggregatedResults = require('./lib/logAggregatedResults.js');
var getFilepaths = require('./lib/getFilepaths.js');

module.exports = function (grunt) {

  var aggregated = {
    passed: 0,
    failed: 0,
    dubious: 0,
    skipped: 0,
  };

  grunt.registerMultiTask(taskName, taskDescription, function () {
    // grunt settings
    var done = this.async();
    var options = this.options({
      async: 'eachSeries',
      clean: true,
      cli: [],
      runner: null
    });
    var files = this.filesSrc;

    // phantom settings
    var phantomBinPath = require('phantomjs').path;
    process.env['PHANTOMJS_EXECUTABLE'] = phantomBinPath;

    // casper settings
    var command = getCasperBinary();
    var args = [];

    // set runner arg
    if (!options.runner) {
      options.runner = 'test';
    }
    args = [options.runner];

    // set cli args
    if (options.cli && options.cli.length > 0) {
      args = args.concat(options.cli);
    }

    // Iterate over all specified file groups.
    var filepaths = getFilepaths(grunt, this.files)

    var asyncType = options.async;
    var asyncFn = async[asyncType];

    asyncFn(filepaths, function filepathIterator(filepath, next) {

      // spawn casper process
      var casperProcess;
      casperProcess = grunt.util.spawn({
        cmd: command,
        args: args.concat(filepath),
      }, function onSuitesDone(error, result, code) {
        next();
      });

      // pipe spawned process outputs
      casperProcess.stdout.on('data', function (buf) {
        parseCasperOutput(grunt, buf, options, aggregated);
      });
      casperProcess.stderr.on('data', function (buf) {
        parseCasperOutput(grunt, buf, options, aggregated);
      });

    }, function (err, res) {
      logAggregatedResults(grunt, aggregated);
      done();
    });

  });

};
