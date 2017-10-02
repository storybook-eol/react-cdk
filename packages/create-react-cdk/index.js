#!/usr/bin/env node

'use strict';

const childProcess = require('child_process');
const path = require('path');
const commander = require('commander');
const chalk = require('chalk');
const shell = require('shelljs');

const packageJson = require('./package.json');

let projectName;

const program = new commander.Command(Object.keys(packageJson.bin)[0])
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]
  ${chalk.gray('or:')}
  yarn create react-cdk ${chalk.green('<project-directory>')} [options]
  ${chalk.gray('or:')}
  npx create-react-cdk ${chalk.green('<project-directory>')} [options]
  `)
  .option('--verbose', 'print additional logs')
  .option(
    '-w, --with <custom-template>',
    'use additional custom template [cdk-template]',
    'cdk-template'
  )
  .allowUnknownOption()
  .on('--help', () => process.stdout.write(`

    Only ${chalk.green('<project-directory>')} is required.

    A [${chalk.cyan('custom-template')}] can be one of:
      - ${chalk.green('nothing')}: suppress installing default template
      - a custom template published on npm: ${chalk.green('my-cdk-template')}
      - a .tgz archive: ${chalk.green('/my-cdk-template.tgz')}

      (if this option isn't specified, default template will be used)

    If you have any problems, do not hesitate to file an issue:
    ${chalk.cyan('https://github.com/storybooks/react-cdk/issues')}

  `))
  .action(name => {
    projectName = name;
  })
  .parse(process.argv);

const testingScripts = new commander.Command()
  .option(
    '--testing-scripts <path-to-package>',
    '(internal usage only, DO NOT RELY ON THIS)'
  )
  .parse(process.argv);

console.log('\nfolder name:', projectName);

if (program.with) {
  process.env.CDK_SCRIPT_TEMPLATE = program.with;
}

const pathToCra = path.resolve(__dirname, 'node_modules/.bin/create-react-app');

const args = [
  pathToCra,
  projectName, /** @todo provide full path */
  '--scripts-version',
  getCDKScriptsPackage(testingScripts.testingScripts)
];

if (program.verbose) {
  args.push('--verbose');
}

const cra = childProcess.spawn('node', args, { env: process.env });

cra.on('close', (code) => {
  if (!code) {
    process.stdout.write(chalk.yellowBright('\nProject is generated successfully!\n\n'));
    process.exit(code);
  } else {
    process.stdout.write(chalk.red(`\nTerminated with code: ${code}\n\n`));
    process.exit(code);
  }
});

cra.stderr.on('data', (data) => {
  process.stderr.write(data);
});

cra.stdout.on('data', (data) => {
  process.stdout.write(data);
});


function getCDKScriptsPackage(localPackage) {
  const npmPackage = '@storybook/cdk-scripts'
  return localPackage || npmPackage;
}
