#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');

const packageJson = require('../package.json');
const { name, version } = packageJson;
const buildInd = require('./build-index.json');

const build = buildInd.version === version ? buildInd.build + 1 : 0;
fs.writeJsonSync(path.resolve(__dirname, './build-index.json'), { version, build });

const tarballPath = path.resolve(__dirname, '../../../tarballs');

try {
const tarballs = shell.find(`${tarballPath}/*`)
  .filter(file => file.match(/\/cdk-scripts(\d+|\.+|-alpha\.|\w?)*\.tgz$/));

shell.echo(chalk.white('\n=> removing tarballs'));
tarballs.forEach(tar => shell.echo(chalk.gray(`rm ${tar}`)));

shell.rm(tarballs);
} catch(err) {

}

const packageName = name.match(/[^\/]*$/)[0];
const tarballName = `${packageName}.${version}.${build}.tgz`;
const exec = `yarn pack --filename ${tarballPath}/${tarballName}`;

shell.echo(chalk.white('\n=> pack a tarball\n'));
shell.echo(chalk.gray(exec));
shell.echo();

shell.exec(exec);

const isCreated = fs.pathExistsSync(`${tarballPath}/${tarballName}`);

if (isCreated) {
  shell.echo(chalk.white('\n=> tarball is created:\n'));
  shell.echo(chalk.cyan(tarballName));
  shell.echo();
} else {
  shell.echo(chalk.red('\n=> tarball is not created :(\n'));
  shell.echo();
}
