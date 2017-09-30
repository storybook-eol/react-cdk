#!/usr/bin/env node

'use strict';

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const args = process.argv.slice(2);
const script = args[0] || 'welcome';
const scriptArgs = args.slice(1);

const appDirectory = fs.realpathSync(process.cwd());

let scriptPath;
try {
  scriptPath = require.resolve(`../scripts/${script}`);
} catch(err) {
  childProcess.spawnSync(
    'node',
    [require.resolve('../scripts/unknown'), script],
    {
      stdio: [0, 1, 2],
  });
  process.exit(1);
}

const result = childProcess.spawnSync('node', [scriptPath, ...scriptArgs], {
  stdio: [0, 1, 2],
});

if (result.status) {
  const report = require('../scripts/report');
  report(script, scriptArgs);
}
