const { spawn } = require('child_process');

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const runs = [
  {
    name: 'group-one / Chrome',
    args: ['cypress', 'run', '--browser', 'chrome', '--spec', 'cypress/e2e/group-one/**/*.cy.js'],
  },
  {
    name: 'group-two / Firefox',
    args: ['cypress', 'run', '--browser', 'firefox', '--spec', 'cypress/e2e/group-two/**/*.cy.js'],
  },
];

const children = runs.map((run) => new Promise((resolve) => {
  console.log(`\\n[START] ${run.name}`);
  const child = spawn(npx, run.args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });

  child.on('error', (error) => {
    console.error(`[ERROR] ${run.name}: ${error.message}`);
    resolve(1);
  });
  child.on('close', (code) => {
    console.log(`[FINISH] ${run.name}: exit ${code}`);
    resolve(code ?? 1);
  });
}));

Promise.all(children).then((codes) => {
  const failed = codes.some((code) => code !== 0);
  process.exitCode = failed ? 1 : 0;
});