const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');

const packPath = path.resolve(__dirname, '../tarballs/cdk-scripts.tgz');
const testPath = path.resolve(__dirname, '../test-gen/test-cdk-scripts');
const exec = `create-react-app ${testPath} --scripts-version ${packPath}`


shell.rm('-rf', testPath);

console.log();
console.log(chalk.gray(exec));
console.log();

shell.exec(exec, function(code, stdout, stderr) {
  if( code === 0) {
    console.log(chalk.yellow(`cdk-scripts successfully generated the project at ${testPath}`));
    const relativePath = path.relative(shell.pwd().toString(), testPath);
    console.log(chalk.yellow(`\ncontinue testing by typing:`));
    console.log(chalk.yellow(`\n$ cd ${relativePath}`));
    console.log(chalk.yellow(`$ yarn storybook`));
  } else {
    console.log(chalk.red(`something's gone wrong...`));
    console.log(chalk.white(`exit code: ${code}`));
  }
});
