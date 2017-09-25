var path = require('path');
var shell = require('shelljs');
var chalk = require('chalk');
var babel = ['node_modules', '.bin', 'babel'].join(path.sep);

require('./ver');


const args = '--ignore tests,stories,story.jsx,story.js src --out-dir dist';
const cmd = `${babel} ${args}`;
shell.echo(chalk.gray(cmd));
shell.rm('-rf', 'dist');

shell.echo('');
shell.echo(chalk.gray('Transpiling \'src\' into ES5 ...'));
shell.exec(cmd);
shell.echo(chalk.gray('Transpiling completed.'));
shell.echo('');
