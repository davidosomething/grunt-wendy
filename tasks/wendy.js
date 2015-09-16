'use strict';

var taskName = 'wendy';
var taskDescription = 'CasperJs test runner';

var async = require('async');
var path = require('path');
var fs = require('fs');

/**
 * getCasperBinary
 *
 * @return {string}
 */
function getCasperBinary() {
  // Use this task's deps?
  var bin = "./node_modules/.bin/casperjs";
  if (!fs.existsSync(bin)) {
    bin = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'casperjs');
    if (!fs.existsSync(bin)) {
      bin = path.join(__dirname, '..', '..', '..', 'casperjs', 'bin', 'casperjs');
    }
  }
  if (process.platform === 'win32') {
    bin += ".cmd";
  }
  return bin;
}

module.exports = function (grunt) {

  var passed = 0;
  var failed = 0;
  var dubious = 0;
  var skipped = 0;

  var parseOutput = function (buf, options) {
    var cast = String(buf);
    var output = '';

    // aggregate results
    if (cast.indexOf('executed in') > -1) {
      var matches = cast.match(/(\d+) passed.*(\d+) failed.*(\d+) dubious.*(\d+) skipped/);
      passed += parseInt(matches[1], 10);
      failed += parseInt(matches[2], 10);
      dubious += parseInt(matches[3], 10);
      skipped += parseInt(matches[3], 10);
    }

    // maybe clean output
    if (options.clean) {
      if (cast.indexOf('executed in') > -1) {
        output = '  ' + cast;
      }
      else if (cast.indexOf('Test file:') > -1) {
        output += "\n  " + cast;
      }
      else {
        output = '  ' + cast;
      }
    }
    else {
      output = cast;
    }

    process.stdout.write(output);
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
    process.env["PHANTOMJS_EXECUTABLE"] = phantomBinPath;

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
    var filepaths = [];
    this.files.forEach(function (file) {
      file.src.filter(function (filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else {
          filepaths.push(filepath);
          return true;
        }
      });
    });

    var asyncType = options.async;
    var asyncFn = async[asyncType];

    asyncFn(filepaths, function filepathIterator(filepath, next) {

      var casperProcess;
      casperProcess = grunt.util.spawn({
        cmd: command,
        args: args.concat(filepath),
      }, function onSuitesDone(error, result, code) {
        next();
      });

      casperProcess.stdout.on('data', function (buf) {
        parseOutput(buf, options);
      });
      casperProcess.stderr.on('data', function (buf) {
        parseOutput(buf, options);
      });

    }, function (err, results) {

      grunt.log.subhead('  Aggregated results:');
      grunt.log.writeln('  ' + passed + ' passed');
      grunt.log.writeln('  ' + failed + ' failed');
      grunt.log.writeln('  ' + dubious + ' dubious');
      grunt.log.writeln('  ' + skipped + ' skipped');

      done();

    });

  });

};
