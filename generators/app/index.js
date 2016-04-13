var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('componentName', { type: String, required: true });
    this.option('githubUrl', { type: String, desc: 'URL of your github repo' });
    this.option('description', { type: String, desc: 'One line description about your component' });

    this.componentName = this.componentName || '';
    this.prettyComponentName = this.componentName
      .split('-')
      .map(function (word) {
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
        'babelrc',
        'eslintrc',
        'gitignore',
        'npmignore'
      ].forEach(function (fileName) {
        self.copy(fileName, self.componentName + '/.' + fileName);
      });
    },

    copyCoreFiles: function () {
      var self = this;
      [
        '.storybook/config.js',
        '.storybook/webpack.config.js',
        '.scripts/mocha_runner.js',
        '.scripts/prepublish.sh',
        '.scripts/get_gh_pages_url.js',
        '.scripts/publish_storybook.sh',
        '.scripts/user/prepublish.sh',
        '.scripts/user/pretest.js',
        '.storybook/user/modify_webpack_config.js'
      ].forEach(function (fileName) {
        self.copy(fileName, self.componentName + '/' + fileName);
      });
    },

    copyPackageJson: function () {
      var self = this;

      self.template(
        'package.json',
        self.componentName + '/package.json',
        {
          name: self.componentName,
          description: self.description,
          githubUrl: self.githubUrl
        }
      );
    },

    copyOtherFiles: function () {
      var self = this;
      self.template(
        'README.md',
        self.componentName + '/README.md',
        {
          name: self.prettyComponentName,
          description: self.description
        }
      );

      self.template(
        'CONTRIBUTING.md',
        self.componentName + '/CONTRIBUTING.md',
        { name: self.prettyComponentName }
      );

      self.copy('LICENSE', self.componentName + '/LICENSE');
    }
  },

  writing: {
    copySrcFiles: function () {
      var self = this;
      [
        'src/index.js',
        'src/stories/index.js',
        'src/tests/index.js'
      ].forEach(function (fileName) {
        self.copy(fileName, self.componentName + '/' + fileName);
      });
    }
  },

  end: {
    logMessage: function () {
      this.log('');
      this.log('Awesome! Your component "' + this.prettyComponentName + '" is ready!');
      this.log('Apply following commands to install dependencies.');
      this.log('');
      this.log(' cd ' + this.componentName);
      this.log(' npm install');
      this.log('');
      this.log('Visit https://github.com/kadirahq/react-cdk to get started!');
      this.log('');
    }
  }
});
