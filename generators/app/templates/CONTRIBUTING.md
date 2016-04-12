# Contributing to <%= name %> Component

We welcome your help to make this component better. This document will help to streamline the contributing process and save everyone's precious time.

## Development Setup

This component has been setup with [React CDK](https://github.com/kadirahq/react-cdk) and help us to focus on the component development.

### QuickStart

* Your component is at `src/index.js`. Open it with an editor.
* Start React Storybook with: `npm run storybook` (stories at `src/stories/index`).
* Watch for tests with: `npm run test-watch` (tests at `src/tests`).

### Source Files

Source files on this project lives under `src` directory and you can write your component using ES2015+. (with babel-preset-stage-2).

`src/index.js` is the main entrypoint in this component and you should expose a React component class from that module(file).

### Developing with React Storybook

[React Storybook](https://github.com/kadirahq/react-storybook) is configured with this component and you can use it to develop your component without a need of an app.

You can try different states of your components very easily. You can [write](https://github.com/kadirahq/react-storybook/blob/master/docs/api.md#story-creation-api) React Storybook stories inside the `src/stories/index.js`.

You can run `npm run storybook` to start the React Storybook console.

To learn more about React Storybook, visit [here](https://github.com/kadirahq/react-storybook).

### Testing with Mocha and Enzyme

This component is configured to use [Mocha](https://github.com/mochajs/mocha) and [Enzyme](https://github.com/airbnb/enzyme). It's also setup for JSDOM so, you can get the [full use](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) of enzyme.

You can write your test cases in `src/tests` directory. There are few commands to run your tests, here are they:

* `npm run testonly` - Run all the tests
* `npm run test-watch` - Run all the tests and watch for changes
* `npm test` - Same as `npm run testonly`, but also do linting before testing.

### Linting

This component uses [ESLint](http://eslint.org/) for linting and uses a slightly modified version of AirBnb style guide (for JS and React).

Modified rules can be found at `.eslintrc` file.

Use these commands to do the linting:

* `npm run lint` - Run eslint
* `npm run lintfix` - Run eslint with --fix flag

### More Info

To learn about dev setup and configurations, visit the [React CDK](https://github.com/kadirahq/react-cdk) repo.
