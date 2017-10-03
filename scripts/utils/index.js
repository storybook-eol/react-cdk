import path from 'path';
import childProcess from 'child_process';
import chalk from 'chalk';


export const generateProject = (scriptName) => new Promise((resolve, reject) => {
  const command = childProcess.spawn('node', [path.join('./scripts', scriptName)]);

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

export const executeScript = (script, cwd) => new Promise((resolve, reject) => {
  const args = script.split(' ');
  const command = childProcess.spawn('yarn', args, {
    cwd,
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
