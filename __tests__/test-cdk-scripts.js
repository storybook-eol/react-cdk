import path from 'path';
import childProcess from 'child_process';
import dirTree from 'directory-tree';
import chalk from 'chalk';


const generateProject = () => new Promise((resolve, reject) => {
  const command = childProcess.spawn('node', ['./scripts/test-cdk-scripts']);

  command.on('close', (code) => {
    if (!code) {
      process.stdout.write(chalk.yellowBright('\nProject is generated successfully!\n\n'));
      resolve(code);
    } else {
      process.stdout.write(chalk.red(`\nTerminated with code: ${code}\n\n`));
      reject(code);
    }
  });

  command.stderr.on('data', (data) => {
    /** Do nothing since could be warning during installation */
  });

  command.stdout.on('data', (data) => {
    process.stdout.write(chalk.green(data));
  });

  process.stdout.write(chalk.yellowBright('\nGenerating a project. It will take some time!...\n\n'));
});

const executeScript = (script) => new Promise((resolve, reject) => {
  const args = script.split(' ');
  const command = childProcess.spawn('yarn', args, {
    cwd: path.resolve(__dirname, '../test-gen/test-cdk-scripts/')
  });

  let stdout = '';
  let stderr = '';
  command.on('close', (code) => {
    if (!code) {
      process.stdout.write(chalk.yellowBright('\nFinished successfully!\n\n'));
      resolve({ code, stdout });
    } else {
      process.stdout.write(chalk.red(`\nTerminated with code: ${code}\n${stderr}\n`));
      reject(code);
    }
  });

  command.stderr.on('data', (data) => {
    /** Do nothing since could be warning during installation */
    stderr = stderr + data;
  });

  command.stdout.on('data', (data) => {
    process.stdout.write(chalk.green(data));
    stdout = stdout + data;
  });

  process.stdout.write(chalk.yellowBright(`\nExecuting script: ${script}. It will take some time!...\n\n`));
});

describe('CDK-Scripts', () => {
  it('Should generate right folder structure by less then 120 sec and run scripts', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    
    expect.assertions(9);
    return generateProject()
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
        return executeScript('prepublish');
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
        return executeScript('cdk-scripts report --info userenv');
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
        return executeScript('cdk-scripts welcome --show success');
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
