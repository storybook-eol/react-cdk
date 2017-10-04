const execSync = require('child_process').execSync;
const path = require('path');
const chalk = require('chalk');

const execCmd = cmd => {
  console.log(chalk.gray(cmd));
  const result = execSync(cmd, { env: process.env });
  console.log(result.toString());
}

const cachePath = path.resolve(__dirname, '../../../.yarn-cache');
process.env.YARN_CACHE_FOLDER = cachePath;

console.log('\nUse local cache for yarn:', cachePath);
console.log('\nBuilding a tarball...');
// execCmd('yarn cache clean @storybook/cdk-template-default');
execCmd('yarn cache clean');
execCmd('yarn pack --filename ../../tarballs/cdk-template-default.tgz');
