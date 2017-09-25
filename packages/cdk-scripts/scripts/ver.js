const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const appDirectory = fs.realpathSync(process.cwd());
const packageJson = require(path.resolve(__dirname, appDirectory, 'package.json'));

shell.echo(chalk.bold(`\n${packageJson.name}@${packageJson.version}\n`));
