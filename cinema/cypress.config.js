const { defineConfig } = require('cypress');

const dashboardConfig = process.env.CYPRESS_PROJECT_ID
  ? { projectId: process.env.CYPRESS_PROJECT_ID }
  : {};

module.exports = defineConfig({
  ...dashboardConfig,
  e2e: {
    baseUrl: 'https://qamid.tmweb.ru',
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 900,
    video: false,
  },
});
