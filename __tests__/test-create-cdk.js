import path from 'path';
import childProcess from 'child_process';
import dirTree from 'directory-tree';
import chalk from 'chalk';

import { generateProject, executeScript } from '../scripts/utils';

describe('Create React CDK', () => {
  
  const scriptName = path.basename(__filename, '.js');
  const cwd = path.resolve(__dirname, '../test-gen', scriptName);

  let exitCode;
  beforeAll(() => {
    /** first, we need to generate a project (into cwd folder) */
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    return generateProject(scriptName)
      .then(code => exitCode = code)
      .then(() => new Promise((resolve, reject) => setTimeout(() => resolve(0), 100)))
  });

  it('Should finish project generation with 0', () => {
    expect(exitCode).toBe(0);
  })

  it('Should have right folder structure', () => {
    
    const projectFolder = dirTree(path.join('./test-gen', scriptName), { exclude: /node_modules/ });
    expect(projectFolder).toMatchSnapshot('test-gen/' + scriptName);
  });
});
