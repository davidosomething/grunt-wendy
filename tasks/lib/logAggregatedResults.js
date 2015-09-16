module.exports = function (grunt, results) {
  grunt.log.subhead('  Aggregated results:');

  grunt.log.writeln('     passed: ' + results.passed);
  grunt.log.writeln('     failed: ' + results.failed);
  grunt.log.writeln('    dubious: ' + results.dubious);
  grunt.log.writeln('    skipped: ' + results.skipped);
};
