# Roadmap

This project is going to be a CRA and @Storybook/CLI based minimalistic boilerplate focused on the components development. General settings will be left to the CRA which is used as a dependency, while React-CDK provides only special scripts and project templates.


## Project development

- [x] create `cdk-scripts` package to wrap `react-scripts`

- [x] use `cdk-scripts` as a custom scripts with CRA

- [x] launch `getstorybook` from `cdk-scripts`

- [x] create `create-react-cdk` package as a CLI for creating projects

- [x] use `create-react-cdk` to launch `create-react-app` internally

- [x] add `prepublish` script to `cdk-scripts`

- [ ] add `pack` script to `cdk-scripts` (publish:local)

- [ ] add `deploy` script to `cdk-scripts`

- [ ] add user templates support

- [ ] add default React-CDK template

- [x] `create-react-cdk` should always use the latest version of `cdk-scripts` (rely on CRA)

- [x] setup yarn workspace

- [ ] add docs & tests

- [ ] update CONTRIBUTING guide


## Features

- [ ] setup [Displaying Lint Output in the Editor](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor)

- [ ] add prettier support

- [ ] setup [Debugging in the Editor](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#debugging-in-the-editor) (for VSCode)

- [ ] bundle libraries with webpack

- [ ] use `-xxx` shortcuts for `@storybook/cdk-template-xxx` in CLI `--with` option


## Templates

- [ ] default template (@storybook/cdk-template)

*Provides minimum required settings*

- [ ] storybook-kitchen-sink

*Goes with full @storybook/cra-kitchen-sink addons equipment*

- [ ] storybook boilerplate

*Creates the well-balanced development environment with most useful addons set from Storybook Addons Gallery* 

- [ ] addon development

*Special template ready for the new Storybook addon creation/development*

- [ ] monorepo template

*With yarn workspaces*


## Publish packages:

- [ ] @storybook/cdk-scripts

- [ ] create-react-cdk

- [ ] @storybook/cdk-template

- [ ] @storybook/cdk-template-storybook-boilerplate

- [ ] @storybook/cdk-template-kitchen-sink


## Development

See details about this [project development](docs/development.md)
