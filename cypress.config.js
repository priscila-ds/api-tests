const { defineConfig } = require('cypress');
const mochawesome = require('cypress-mochawesome-reporter/plugin');
require('dotenv').config();

const requestTimeoutMs = Number(process.env.REQUEST_TIMEOUT_MS || 5000);

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      mochawesome(on);
      return config;
    }
  },
  allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    reportDir: 'cypress/reports/html',
    reportPageTitle: 'API Tests - Cypress',
    saveAllAttempts: false
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  video: true,
  screenshotsFolder: 'cypress/evidence/screenshots',
  videosFolder: 'cypress/evidence/videos',
  downloadsFolder: 'cypress/downloads',
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 10000,
  requestTimeout: requestTimeoutMs,
  responseTimeout: requestTimeoutMs
});
