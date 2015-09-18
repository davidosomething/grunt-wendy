var aggregated = {
  passed: 0,
  failed: 0,
  dubious: 0,
  skipped: 0,
};

/**
 * aggregate
 *
 * @param {string} data output from casper
 * @return {object} aggregated data
 */
module.exports = function aggregate(data) {
  if (data.indexOf('executed in') > -1) {
    var matches = data.match(/(\d+) passed.*(\d+) failed.*(\d+) dubious.*(\d+) skipped/);
    aggregated.passed += parseInt(matches[1], 10);
    aggregated.failed += parseInt(matches[2], 10);
    aggregated.dubious += parseInt(matches[3], 10);
    aggregated.skipped += parseInt(matches[4], 10);
  }
  return aggregated;
};
