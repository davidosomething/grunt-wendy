var write = process.stdout.write.bind(process.stdout);

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
        write(grunt.util.linefeed, 'utf8');
      }
      write('  ' + data, 'utf8');
      return;
    }
  }

  // default -- straight output
  write(data, 'utf8');
  return;

};
