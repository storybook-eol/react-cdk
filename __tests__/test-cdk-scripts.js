import path from 'path';
import childProcess from 'child_process';
import dirTree from 'directory-tree';
import chalk from 'chalk';

import { generateProject, executeScript } from '../scripts/utils';

describe('CDK-Scripts', () => {
  const cwd = path.resolve(__dirname, '../test-gen/test-cdk-scripts/');
  const scriptName = path.basename(__filename, '.js');

  it('Should generate right folder structure by less then 120 sec and run scripts', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    
    expect.assertions(9);
    return generateProject(scriptName)
      .then(code => {
        /** project should be successfully generated: */

        expect(code).toBe(0);
        return code;
      })
      .then(code => {
        /** project folder should have the correct structure: */

        const projectFolder = dirTree('./test-gen/test-cdk-scripts', { exclude: /node_modules/ });
        expect(projectFolder).toMatchSnapshot('test-gen/test-cdk-scripts');

        /** run prepublish script */
        return executeScript('prepublish', cwd);
      })
      .then(({ code, stdout }) => {
        /** script should successfully executed */

        expect(code).toBe(0);
        return stdout;
      })
      .then(stdout => {
        /** dist folder should have the correct structure: */

        const projectFolder = dirTree('./test-gen/test-cdk-scripts/dist', { exclude: /node_modules/ });
        expect(projectFolder).toMatchSnapshot('test-gen/test-cdk-scripts/dist');

        /** run report script */
        return executeScript('cdk-scripts report --info userenv', cwd);
      })
      .then(({ code, stdout }) => {
        /** script should successfully executed */

        expect(code).toBe(0);
        return stdout;
      })
      .then(stdout => {
        /** report script should have the correct output */

        expect(stdout).toEqual(expect.stringContaining('Please, include this information to the bug report'));

        /** run welcome script */
        return executeScript('cdk-scripts welcome --show success', cwd);
      })
      .then(({ code, stdout }) => {
        /** script should successfully executed */

        expect(code).toBe(0);
        return stdout;
      })
      .then(stdout => {
        /** welcome script should have the correct output */

        expect(stdout).toEqual(expect.stringContaining('For more information visit'));

        return new Promise((resolve, reject) => setTimeout(() => resolve(0), 100))
      })
      .then(code => {
        /** just check that chain is finished */

        expect(code).toBe(0);
      })
      .catch(code => {
        throw(code);
      })
      ;
  });
})

/**
 * @todo: move generateProject() to beforeAll. Split chain to separate tests
 * 
 */
