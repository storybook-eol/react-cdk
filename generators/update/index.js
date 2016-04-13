var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  configuring: {
    updateDotFiles: function() {
      var self = this;
      [
        '.storybook/config.js',
        '.storybook/webpack.config.js',
        '.scripts/mocha_runner.js',
        '.scripts/prepublish.sh',
        '.scripts/get_gh_pages_url.js',
        '.scripts/publish_storybook.sh',
      ].forEach(function(fileName) {
        self.bulkCopy(
          self.templatePath('../../app/templates', fileName),
          self.destinationPath(fileName)
        );
      });
    },

    updatePackageJson: function() {
      var self = this;
    },
  },

  end: {
    logMessage: function() {
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
