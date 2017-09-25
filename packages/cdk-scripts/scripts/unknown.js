const shell = require('shelljs');
const chalk = require('chalk');

require('./ver');
const args = process.argv.slice(2);
shell.echo(`${args[0]} script doesn't exist!`);
