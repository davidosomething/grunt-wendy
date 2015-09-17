module.exports = function (grunt, buf, options, aggregated) {
  var cast = String(buf);
  var output = '';

  // aggregate results
  if (cast.indexOf('executed in') > -1) {
    var matches = cast.match(/(\d+) passed.*(\d+) failed.*(\d+) dubious.*(\d+) skipped/);
    aggregated.passed += parseInt(matches[1], 10);
    aggregated.failed += parseInt(matches[2], 10);
    aggregated.dubious += parseInt(matches[3], 10);
    aggregated.skipped += parseInt(matches[4], 10);
  }

  // maybe clean output
  if (options.clean) {
    if (cast.indexOf('Test file:') > -1) {
      output += grunt.util.linefeed + '  ' + cast;
    }
    else {
      output = cast.replace(/^\w*/, '  ');
    }
  }
  else {
    output = cast;
  }

  process.stdout.write(output);
};
