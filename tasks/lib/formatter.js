/**
 * formatCasperOutput
 *
 * @param {object} grunt
 * @param {object} options from grunt task
 * @param {string} data casper output line
 */
module.exports = function formatCasperOutput(grunt, options, data) {

  if (options.formatterOptions) {
    // should this line be filtered out?
    if (options.formatterOptions.filter) {
      if (options.formatterOptions.filter.test(data)) {
        return;
      }
    }

    // format whitespace?
    if (options.formatterOptions.whitespace) {
      if (data.indexOf('Test file:') > -1) {
        process.stdout.write(grunt.util.linefeed);
      }
      process.stdout.write('  ' + data);
      return;
    }
  }

  // default -- straight output
  process.stdout.write(data);
  return;

};
