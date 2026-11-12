const { defineConfig } = require('cypress');

const dashboardConfig = process.env.CYPRESS_PROJECT_ID
  ? { projectId: process.env.CYPRESS_PROJECT_ID }
  : {};

module.exports = defineConfig({
  ...dashboardConfig,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  e2e: {
    baseUrl: 'http://qamid.tmweb.ru',
    specPattern: 'cypress/e2e/**/*.cy.js',
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 900,
    video: false,
  },
});
