var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  _updatePackageJsonSection: function (source, dest, section) {
    var newDest = dest;
    _.each(source[section], function (value, key) {
      newDest[section][key] = value;
    });
  },

  configuring: {
    updateDotFiles: function () {
      var self = this;
      [
        '.storybook/config.js',
        '.scripts/mocha_runner.js',
        '.scripts/prepublish.sh',
        '.scripts/get_gh_pages_url.js',
        '.scripts/publish_storybook.sh'
      ].forEach(function (fileName) {
        self.bulkCopy(
          self.templatePath('../../app/templates', fileName),
          self.destinationPath(fileName)
        );
      });

      [
        'babelrc',
        'eslintrc'
      ].forEach(function (fileName) {
        self.copy(
          self.templatePath('../../app/templates', fileName),
          self.destinationPath('.' + fileName)
        );
      });
    },

    updatePackageJson: function () {
      var self = this;
      var dest = require(self.destinationPath('package.json'));
      var source = require(self.templatePath('../../app/templates/package.json'));

      self._updatePackageJsonSection(source, dest, 'devDependencies');
      self._updatePackageJsonSection(source, dest, 'dependencies');
      self._updatePackageJsonSection(source, dest, 'peerDependencies');
      self._updatePackageJsonSection(source, dest, 'scripts');

      self.write(self.destinationPath('package.json'), JSON.stringify(dest, null, 2));
    }
  },

  end: {
    logMessage: function () {
      this.log('');
      this.log('Your package has been updated to the latest React CDK version.');
      this.log('Apply following command to complete the update process.');
      this.log('');
      this.log(' npm install');
      this.log('');
      this.log('Keep rocking.');
      this.log('');
    }
  }
});
