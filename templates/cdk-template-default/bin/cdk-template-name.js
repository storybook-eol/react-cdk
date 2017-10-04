#!/usr/bin/env node

'use strict';

const ownPackage = require('../package.json');

process.stdout.write(ownPackage.name);
// console.log(ownPackage.name);
