const chalk = require('chalk');

const ownPackage = require('./package.json');

module.exports = function(api) {
  const ver = `\n${ownPackage.name}@${ownPackage.version}\n`
  console.log(chalk.bold(ver));
}
