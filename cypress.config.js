const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: 'src/react/utils/cypress/recordings',
  videosFolder: 'src/react/utils/cypress/recordings',
  fixturesFolder: false,
  video: false,
  screenshotOnRunFailure: false,
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
    TAGS: 'not @pending',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./src/react/utils/cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3300',
    specPattern: 'src/react/**/*.feature',
    supportFile: 'src/react/utils/cypress/support/index.js',
  },
})
