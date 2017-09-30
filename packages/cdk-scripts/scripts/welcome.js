const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');


function success(appPath, appName, isYarn) {
  const runPM = isYarn ? 'yarn' : 'npm';
  const runScript = isYarn ? 'yarn' : 'npm run';
  const appPackage = require(path.join(appPath, 'package.json'));

  shell.echo(chalk.whiteBright(`
  Success! 
  Created ${chalk.bgWhite.black(appName)} at ${chalk.grey(appPath)}
  Your project is based on ${chalk.cyan('create-react-app')} and have ${chalk.cyan('Storybook/react')} installed.
  Inside that directory, you can run commands provided by ${chalk.cyan('cdk-scripts')}:

    ${chalk.cyan(`${runScript} storybook`)}
      Starts Storybook server.

    ${chalk.cyan(`${runPM} publish`)}
      Compile your project and publish it to npm as ${chalk.bgWhite.black(appPackage.name)} package.

    ${chalk.cyan(`${runPM} pack`)}
      Compile your project and pack it into tarball file in you project folder.

    ${chalk.cyan(`${runScript} lint`)}
      Starts linter.

  Also you can still use ${chalk.cyan('react-scripts')} commands:

    ${chalk.cyan(`${runPM} test`)}
      Starts the test runner.

    ${chalk.cyan(`${runScript} eject`)}
      Removes react-scripts and copies build dependencies, configuration files
      and scripts into the app directory. If you do this, you can’t go back!

  We suggest that you begin by typing:

    cd ${path.relative(fs.realpathSync(process.cwd()), appPath) || '.'}
    ${chalk.cyan(`${runScript} storybook`)}

  For more information visit: ${chalk.grey('https://github.com/storybooks/react-cdk')}
  Happy hacking!

  `));
}

module.exports = success;

const args = process.argv.slice(2);
const script = args[0];
const scriptArgs = args.slice(1);

const shouldUseYarn = () => {
  try {
    childProcess.execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

if (script === '--show' && scriptArgs[0] === 'success') {
  const appDirectory = fs.realpathSync(process.cwd());
  let appPackage;
  let appName;
  try {
    appPackage = require(path.join(appDirectory, 'package.json'));
    appName = appPackage.name;
  } catch (err) {
    appName = '';
  }
  success(appDirectory, appName, shouldUseYarn());
}
