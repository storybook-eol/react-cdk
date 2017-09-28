const path = require('path');
const childProcess = require('child_process');
const shell = require('shelljs');
const chalk = require('chalk');

const babel = path.resolve(process.cwd(), 'node_modules/.bin/babel');

require('./ver');


const args = [
  'src',
  '--ignore tests,stories,story.jsx,story.js,test.js',
  '--out-dir dist',
  '--copy-files'
].join(' ');

const cmd = `${babel} ${args}`;
shell.echo(chalk.gray(cmd));
shell.rm('-rf', 'dist');

shell.echo('');
shell.echo(chalk.gray('\n=> Transpiling "src" into ES5 ...\n'));

try {
  childProcess.execSync(cmd,
    {stdio: [0, 1, 2]}
  );
  shell.echo(chalk.gray('\n=> Transpiling completed.\n'));
} catch (err) {
  shell.echo(chalk.gray('\n=> Transpilation terminated with error.\n'));
  shell.exit(err.status);

}
