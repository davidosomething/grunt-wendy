var path = require('path');
var fs = require('fs');

/**
 * getCasperBinary
 *
 * @return {string}
 */
module.exports = function () {
  // Use this task's deps?
  var bin = './node_modules/.bin/casperjs';
  if (!fs.existsSync(bin)) {
    bin = path.join(__dirname, '..', '..', 'node_modules', '.bin', 'casperjs');
    if (!fs.existsSync(bin)) {
      bin = path.join(__dirname, '..', '..', '..', 'casperjs', 'bin', 'casperjs');
    }
  }
  if (process.platform === 'win32') {
    bin += '.cmd';
  }
  return bin;
};

