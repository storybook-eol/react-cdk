'use strict';

const path = require('path');
const childProcess = require('child_process');
const fs = require('fs-extra');
const reactScriptsInit = require('react-scripts/scripts/init.js');

module.exports = function(
  appPath,
  appName,
  verbose,
  originalDirectory,
  template
) {
  const logger = {
    log: console.log,
  };
  // console.log = () => {};

  /** Run standard CRA init script */
  reactScriptsInit(
    appPath,
    appName,
    verbose,
    originalDirectory,
    template
  );

  // const args = `
  //   CDK-Scripts was invoked with args:
  //   appPath: ${appPath}
  //   appName: ${appName}
  //   verbose: ${verbose}
  //   originalDirectory: ${originalDirectory}
  //   template: ${template}
  // `;
  const ownPackage = require(path.join(__dirname, '..', 'package.json'));
  const appPackage = require(path.join(appPath, 'package.json'));
  const ownPath = path.join(appPath, 'node_modules', ownPackage.name);
  const getstorybookPath = path.join(appPath, 'node_modules/@storybook/cli/bin/generate.js');
  // logger.log(`\n\n${ownPackage.name}-${ownPackage.version}:`);
  // logger.log(args);
  // logger.log(`ownPath: ${ownPath}`);

  /** Prepare package.json */
  appPackage.devDependencies = appPackage.dependencies;
  appPackage.devDependencies['react-scripts'] = '*';
  appPackage.peerDependencies = appPackage.peerDependencies || {};
  appPackage.peerDependencies.react = '>=0.15.0';
  appPackage.dependencies = {};
  appPackage.description = `${appName} development kit`; /** @todo check this field */
  appPackage.repository = {
    type: 'git',
    url: `https://github.com/org-name/${appName}`, /** @todo check this field */
  }
  appPackage.bugs = {
    url: `https://github.com/org-name/${appName}/issues`, /** @todo check this field */
  },
  appPackage.homepage = `https://github.com/org-name/${appName}`, /** @todo check this field */
  appPackage.license = 'MIT';
  appPackage.main = 'dist/index.js';
  appPackage.engines = {
    npm: '>=4.0.0', /** @todo check this field */
  };
  /** Add scripts except prepublish and prepack to not trigger code compilation */
  appPackage.scripts = {
    'start': 'npm run storybook',
    'test': 'cdk-scripts test --env=jsdom',
    'lint': 'cdk-scripts lint',
    'lint:fix': 'cdk-scripts lint --fix',
    'publish:local': 'npm pack',
    'deploy': 'cdk-scripts deploy',
  }

  /** Save package.json to the App folder */
  fs.writeJsonSync(path.join(appPath, 'package.json'), appPackage);

  /** Run getstorybook */
  const rez = childProcess.execFileSync(getstorybookPath, {
    cwd: appPath,
    stdio: [0, 1, 2],
  });

  /** We need to change project template after 'react-scripts' and `getstorybook` */
  fs.removeSync(path.join(appPath, 'public'));
  fs.removeSync(path.join(appPath, 'src'));
  fs.copySync(
    path.join(ownPath, 'template'),
    appPath
  );
  /** rename .npmignore and .gitignore */
  fs.moveSync(
    path.join(appPath, '_npmignore'),
    path.join(appPath, '.npmignore')
  );
  fs.moveSync(
    path.join(appPath, '_gitignore'),
    path.join(appPath, '.gitignore')
  );

  /** Add prepublish and prepack scripts to package.json */
  appPackage.scripts = {
    'prepublish': 'cdk-scripts prepublish',
    'prepack': 'npm run prepublish',
  }
  fs.writeJsonSync(path.join(appPath, 'package.json'), appPackage, { spaces: 2 });


}
