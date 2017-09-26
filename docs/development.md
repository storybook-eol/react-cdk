
## Scripts

### cdk-scripts development 

```sh
cd packages/cdk-scripts
yarn dev
```

It will run nodemon which will build a tarball of this package
The tarball is located in `tarballs/cdk-scripts.**.tgz`

To build test project run `scripts/test-cdk-scripts.js`.
Test project will be located in `test-gen/test-cdk-scripts`.

## VSCode debug tasks:

### Debug scripts from `cdk-scripts` package

These scripts are launched from `test-script/launch-ckd-scripts` test folder.

task: `launch cdk scripts: bin`
runs: `cdk-scripts/.bin/cdk-scripts.js`

task: `launch cdk scripts: prepublish`
runs: `cdk-scripts/scripts/prepublish.js`



