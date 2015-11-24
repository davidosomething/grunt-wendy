var getCasperBinary = require('./getCasperBinary.js');
var aggregate       = require('./aggregate.js');
var parseFlags      = require('./parseFlags.js');

var casperBin = getCasperBinary();

/**
 * filepathIteratorModule
 *
 * @param {object} grunt
 * @param {object} options
 * @return {Function} that spawns a casper process
 */
module.exports = function filepathIteratorModule(grunt, options) {
  // casper args
  var casperArgs = [options.runner];
  if (options.cli && options.cli.length > 0) {
    casperArgs = casperArgs.concat(options.cli);
  }

  // map grunt:wendy flags -> casper args
  casperArgs = casperArgs.concat(parseFlags(grunt.option.flags()));

  /**
    * spawnOut
    *
    * task's default parser for casper stdout/err
    *
    * @param {object} data piped buffer for stdout/err from grunt.util.spawn
    */
  var spawnOut = function spawnOut(data) {
    var cast = String(data);
    options._aggregated = aggregate(cast);
    options.formatter(grunt, options, cast);
  };

  /**
  * filepathIterator
  *
  * @param {string} filepath passed from grunt src
  * @param {Function} next must be called to continue to next async
  */
  return function filepathIterator(filepath, next) {
    var spawnOpts = {
      cmd:  casperBin,

      // casperjs ARGS
      args: casperArgs.concat(filepath)
    };

    // nodeSpawnOptions
    // See https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
    if (options.spawnOpts) {
      spawnOpts.opts = options.spawnOpts;
    }

    /**
     * onFilepathDone
     *
     * @param {ErrorObject} error null or Error
     * @param {object} result { stdout:string, stderr:string, code:int }
     * @param {int} code return code from casper.exit()
     */
    var spawnDone = function onFilepathDone(error, result, code) {
      next();
    };

    var casperProcess;
    casperProcess = grunt.util.spawn(spawnOpts, spawnDone);
    casperProcess.stdout.on('data', spawnOut);
    casperProcess.stderr.on('data', spawnOut);
  };
};
