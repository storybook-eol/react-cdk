var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
    this.option('githubUrl', { type: String, desc: "URL of your github repo" });
    this.option('description', { type: String, desc: "One line description about your component" });

    this.componentName = this.componentName || '';
    this.prettyComponentName = this.componentName
      .split('-')
      .map(function(word) {
        return _.capitalize(word);
      })
      .join(' ');

    this.githubUrl = this.options.githubUrl || 'https://github.com/you/repo.git';
    this.description = this.options.description || this.prettyComponentName + ' Component';
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
        '.scripts/prepublish.sh',
        '.scripts/get_gh_pages_url.js',
        '.scripts/publish_storybook.sh',
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
        {
          name: self.componentName,
          description: self.description,
          githubUrl: self.githubUrl
        }
      );
    },

    copyOtherFiles: function() {
      var self = this;
      self.fs.copyTpl(
        self.templatePath('README.md'),
        self.destinationPath(self.componentName + '/README.md'),
        {
          name: self.prettyComponentName,
          description: self.description
        }
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
  },

  end: {
    logMessage: function() {
      this.log('');
      this.log('Awesome! Your component "' + this.prettyComponentName + '" is ready!');
      this.log('Apply following commands to install dependencies.');
      this.log('');
      this.log(' cd ' + this.componentName);
      this.log(' npm install');
      this.log('');
      this.log('Refer CONTRIBUTING.md and start building your awesome component.');
      this.log('');
    }
  }
});
