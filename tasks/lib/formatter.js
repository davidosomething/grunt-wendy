module.exports = function (grunt, options, data) {
  if (options.clean) {
    if (data.indexOf('Test file:') > -1) {
      process.stdout.write(grunt.util.linefeed);
    }
    process.stdout.write('  ' + data);
  }
  else {
    process.stdout.write(data);
  }
};
