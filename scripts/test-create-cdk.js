const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');

const tarballPath = path.resolve(__dirname, '../tarballs');
const tarballs = shell.find(`${tarballPath}/*`)
  .filter(file => file.match(/\/cdk-scripts(\d+|\.+|-alpha\.|\w?)*\.tgz$/));

if (!tarballs.length) shell.exit(1);

const packPath = tarballs[0];

const testPath = path.resolve(__dirname, '../test-gen/');
const binPath = path.resolve(__dirname, '../node_modules/.bin/create-react-cdk');
const exec = `${binPath} test-create-cdk --with package --testing-scripts ${packPath}`;


shell.rm('-rf', path.join(testPath, 'test-create-cdk'));


console.log();
console.log(chalk.gray(`cd ${testPath}`));
console.log();
console.log(chalk.gray(exec));
console.log();


shell.cd(testPath);

shell.exec(exec, function(code, stdout, stderr) {
  if( code === 0) {
    console.log(chalk.yellow(`cdk-scripts successfully generated the project at ${testPath}`));
    const relativePath = path.relative(shell.pwd().toString(), path.join(testPath, 'create-react-cdk'));
    console.log(chalk.yellow(`\ncontinue testing by typing:`));
    console.log(chalk.yellow(`\n$ cd ${relativePath}`));
    console.log(chalk.yellow(`$ yarn storybook`));
  } else {
    console.log(chalk.red(`something's gone wrong...`));
    console.log(chalk.white(`exit code: ${code}`));
    shell.exit(code);
  }
});
