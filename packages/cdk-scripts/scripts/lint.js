const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');


const isJSON = process.argv.includes('-f') && process.argv.includes('json');
const out = isJSON ? ['-o .scripts/lintresult.json'] : [];

const lint = ['node_modules', '.bin', 'eslint'].join(path.sep);
const args = [
  'src',
  '--ext .jsx,.js',
  '--color',
  ...process.argv.slice(2),
  ...out,
].join(' ');
const cmd = `${lint} ${args}`;

if(isJSON) {
  shell.echo('\nESLint:');
} else {
  require('./ver');
}
shell.echo(chalk.gray(cmd));
shell.exec(cmd);

if(isJSON) {
  shell.echo('');
  const lintresult = require('./lintresult.json');
  lintresult.forEach( val => {
    const err = val.errorCount;
    const war = val.warningCount;
    const fpath = path.relative(process.cwd(), val.filePath);
    if (err || war) {
      shell.echo(`${chalk.grey(fpath)} ${err ? chalk.red(`errors: ${err}` + (war ? ', ' : '')) : ''}${war ? chalk.yellow(`warnings: ${war}`) : ''}`);


    }
  })
  shell.rm('.scripts/lintresult.json');
}
