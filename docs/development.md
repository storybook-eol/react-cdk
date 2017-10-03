## How it works

It consists of these main packages:

- create-react-cdk

A CLI tool that runs CRA internally with `--scripts-version cdk-scripts`

- cdk-scripts

A custom CRA scripts that 1) wraps original `react-scripts`, 2) launch `@storybook/cli`, 3) Apply specified custom template over default CRA generated project

- cdk-template

Default `react-cdk` template. Provides some some additional setting and overrides of original CRA template.

### Usage: 

`create-react-cdk <project-directory> [options]`
  or:
`yarn create react-cdk <project-directory> [options]`
  or:
`npx create-react-cdk <project-directory> [options]`

run `yarn create-react-cdk --help` in the root of project for CLI details

### Keeping up-to-date

CRA internally always installs the latest version of scripts. So you don't need to update it each time.
Since we rely CRA and `react-scripts` settings and use the `@storybook/cli` to add optimized for CRA Storybook configuration, we can focus only on `react-cdk` features.

## How to generate projects locally

You can run scripts from `.scripts` folder. Each will generate a project in the `./test-gen` folder.

- test-cdk-scripts - via `./package/cdk-scripts`

- test-create-cdk - via `./package/create-react-cdk`

This project isn't included to yarn workspace and you can check it out as a usual project

**Note**: you need to build tarball for `cdk-scripts` on each change (see [How to build tarballs](how-to-build-tarballs))


## How to test with Jest:

run `yarn test` from root of project

It'll do the follow:

- runs tests from `./__test__` folder

- each test starts from running a script from `./scripts` folder with the same name as a test file

- These scripts generate a project into `./test-gen/scriptName` folder. (scriptName - the name of script). This takes few minutes!

- Then tests check the folder structure and test executing project scripts

At this moment there are two testing scripts:

- test-cdk-scripts - to test `./package/cdk-scripts`

- test-create-cdk - to test `./package/create-react-cdk`


## How to run `cdk-scripts` commands

`cd ./test-script/launch-cdk-scripts`

This folder simulates generated project but thanks to Yarn workspace linked to the `./packages/cdk-scripts`. You can edit `./packages/cdk-scripts` files and execute them from this folder.


## How to build tarballs

```sh
cd packages/cdk-scripts
yarn dev
```

This command will start nodemon to watch and build a tarball of this package on each change
The tarball will be located in `tarballs/cdk-scripts.**.tgz`

We need to change file name for each build in order to use with CRA (we do automatically with `packages/cdk-scripts/.dev/pack.js` script)

## How to debug

if you're using VSCode you can run scripts in the debug mode. For some of them there are tasks in configuration. Open `DEBUG` view on you left panel and select the script you want to launch. Open `.vscode/launch.json` to explore details and create other tasks.


