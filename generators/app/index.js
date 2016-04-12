var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
    this.prettyComponentName = _.capitalize(this.componentName);
  },

  configuring: {
    copyDotFiles: function() {
      var self = this;
      [
        '.babelrc',
        '.eslintrc',
        '.gitignore',
        '.npmignore',
        '.storybook/config.js',
        '.storybook/webpack.config.js',
        '.scripts/mocha_runner.js',
        '.scripts/prepublish.sh'
      ].forEach(function(fileName) {
        self.fs.copy(
          self.templatePath(fileName),
          self.destinationPath(self.componentName + '/' + fileName)
        );
      });
    },

    copyPackageJson: function() {
      var self = this;
      self.fs.copyTpl(
        self.templatePath('package.json'),
        self.destinationPath(self.componentName + '/package.json'),
        { name: self.componentName }
      );
    },

    copyOtherFiles: function() {
      var self = this;
      self.fs.copyTpl(
        self.templatePath('README.md'),
        self.destinationPath(self.componentName + '/README.md'),
        { name: self.prettyComponentName }
      );

      self.fs.copyTpl(
        self.templatePath('CONTRIBUTING.md'),
        self.destinationPath(self.componentName + '/CONTRIBUTING.md'),
        { name: self.prettyComponentName }
      );
    }
  },

  writing: {
    copySrcFiles: function() {
      var self = this;
      [
        'src/index.js',
        'src/stories/index.js',
        'src/tests/index.js'
      ].forEach(function(fileName) {
        self.fs.copy(
          self.templatePath(fileName),
          self.destinationPath(self.componentName + '/' + fileName)
        );
      });
    }
  }
});
