/**
 * Parse flags passed to Grunt.
 * Any flags beginning with "wendy-" are passed to casper as CLI args.
 *
 * @example
 *
 *    grunt wendy:mySpec --wendy-server=http://localhost
 *
 * maps to:
 *
 *    casper test mySpec --server=http://localhost
 *
 */

/**
 * parseFlags
 *
 * @public
 * @param {String[]} flags grunt.option.flags()
 * @return {String[]}
 */
var parseFlags = function (flags) {
  if (!flags.length) {
    return [];
  }

  var filteredForWendyFlags = flags.filter(function (value) {
    return value.indexOf('--wendy-') === 0;
  });

  return filteredForWendyFlags.map(function (value) {
    // remove --wendy-
    // add --
    return '--' + value.substr(8);
  });
};

module.exports = parseFlags;
