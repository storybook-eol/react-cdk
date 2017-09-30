const fs = require('fs');
const path = require('path');
const os = require('os');
const childProcess = require('child_process');

const shell = require('shelljs');
const chalk = require('chalk');

module.exports = function(script, args) {
  const ownPackageJson = require('../package.json');

  shell.echo(chalk.blueBright('\nPlease, include this information to the bug report:\n'));
  shell.echo(chalk.gray(`${ownPackageJson.name}@${ownPackageJson.version}`));
  shell.echo(chalk.gray(`Script: ${script} ${args}`));
  shell.echo(chalk.gray(`OS: ${os.type()}`));
  shell.echo(chalk.gray(`Node: ${process.version}`));
  shell.echo(chalk.gray(`Npm: ${childProcess.execSync('npm -v').toString().replace('\n', '')}`));
  shell.echo(chalk.gray(`Yarn: ${childProcess.execSync('yarn -v').toString().replace('\n', '')}`));
  shell.echo(`${chalk.blueBright('issues: ')}${chalk.white('https://github.com/storybooks/react-cdk/issues/new\n')}`);
}

const args = process.argv.slice(2);
const script = args[0];
const scriptArgs = args.slice(1);

if (script === '--info' && scriptArgs[0] === 'userenv') {
  module.exports(script, scriptArgs);
}
