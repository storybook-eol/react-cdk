const spawn = require('child_process').spawn;
const path = require('path');
const install = require('../../../packages/cdk-scripts/scripts/utils/installPackage.js');

const package = path.resolve(__dirname, '../../../tarballs/cdk-template-default.tgz');

const cachePath = path.resolve(__dirname, '../../../.yarn-cache');
process.env.YARN_CACHE_FOLDER = cachePath;

const rm = () => new Promise((resolve, reject) => {
  const args = ['remove', '@storybook/cdk-template-default'];
  const command = spawn('yarn', args, { stdio: 'inherit' });
  command.on('close', code => {
    if (code !== 0) {
      reject({
        command: `npm ${args.join(' ')}`,
      });
      return;
    }
    console.log('remove @storybook/cdk-template-default - Done!');
    resolve();
  });
});

const getName = () => new Promise((resolve, reject) => {
  const command = spawn('node', ['./node_modules/.bin/cdk-template-name']);
  
  command.on('close', code => {
    if (code !== 0) {
      reject(code);
      return;
    }
    resolve(output);
  })

  let output ='';
  command.stdout.on('data', data => {
    output += data;
  });
});


rm()
  .catch(res => {
    console.log(res);
  })
  .then(() => install(true, [package], false, true))
  .then(() => getName())
// getName()
  .then(name => {
    console.log('Name:', name);
    const customTemplate = require(name);
    const init = customTemplate.init;
    init();
  })
  .catch(err => {
    console.log('Error:');
    console.log(err);
  })
  ;

/**
 * issue:
 * 
$ yarn remove cdk-template-default
yarn remove v1.0.2
error No lockfile in this directory. Run `yarn install` to generate one.
 */
