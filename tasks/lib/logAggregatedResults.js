/**
 * logAggregatedResults
 *
 * @param {object} grunt
 * @param {object} results
 */
module.exports = function logAggregatedResults(grunt, results) {
  grunt.log.subhead('  Aggregated results:');

  if (results && Object.keys(results).length) {
    grunt.log.writeln('     passed: ' + results.passed);
    grunt.log.writeln('     failed: ' + results.failed);
    grunt.log.writeln('    dubious: ' + results.dubious);
    grunt.log.writeln('    skipped: ' + results.skipped);
  }
};
