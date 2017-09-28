import path from 'path';
import childProcess from 'child_process';
import dirTree from 'directory-tree';
import chalk from 'chalk';


const generateProject = () => new Promise((resolve, reject) => {
  const command = childProcess.spawn('node', ['./scripts/test-cdk-scripts']);

  command.on('close', (code) => {
    process.stdout.write(chalk.yellowBright('\nProject is generated successfully!\n\n'));
    if (!code) {
      resolve(code);
    } else {
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
  const command = childProcess.spawn('yarn', [script], {
    cwd: path.resolve(__dirname, '../test-gen/test-cdk-scripts/')
  });

  command.on('close', (code) => {
    process.stdout.write(chalk.yellowBright('\nFinished successfully!\n\n'));
    if (!code) {
      resolve(code);
    } else {
      reject(code);
    }
  });

  command.stderr.on('data', (data) => {
    /** Do nothing since could be warning during installation */
  });

  command.stdout.on('data', (data) => {
    process.stdout.write(chalk.green(data));
  });

  process.stdout.write(chalk.yellowBright(`\nExecuting script: ${script}. It will take some time!...\n\n`));
});

describe('CDK-Scripts', () => {
  it('Should generate right folder structure by less then 120 sec', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
    
    expect.assertions(3);
    return generateProject()
      .then(code => {
        expect(code).toBe(0);
        return code;
      })
      .then(code => {
        const projectFolder = dirTree('./test-gen/test-cdk-scripts', { exclude: /node_modules/ });
        expect(projectFolder).toMatchSnapshot('test-gen/test-cdk-scripts');
        return executeScript('prepublish');
      })
      .then(code => {
        const projectFolder = dirTree('./test-gen/test-cdk-scripts/dist', { exclude: /node_modules/ });
        console.log('\n\n\n\n\n\n\n\n\n');
        expect(projectFolder).toMatchSnapshot('test-gen/test-cdk-scripts/dist');
      });
  });
})
