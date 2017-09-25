const fs = require('fs-extra');
const path = require('path');

const ver = require('./ver.json').ver + 1;
const package = require('./package.json');

const sampleName = 'test-cdk-scripts';
const buildSample = `#!/bin/bash

rm ../${sampleName} -fr
create-react-app ../${sampleName} --scripts-version ${__dirname}/${package.name}-${package.version}.tgz
`;

package.version = `0.1.0-alpha.${ver}`

fs.writeFileSync(
  path.join(__dirname, 'package.json'),
  JSON.stringify(package, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, 'ver.json'),
  JSON.stringify({ver}, null, 2)
);


fs.writeFileSync(
  path.join(__dirname, 'build-sample.sh'),
  buildSample
);

