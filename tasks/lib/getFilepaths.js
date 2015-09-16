module.exports = function (grunt, files) {
  var filepaths = [];

  files.forEach(function (file) {
    file.src.filter(function (filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" not found.');
        return false;
      }

      filepaths.push(filepath);
      return true;
    });
  });

  return filepaths;
};
