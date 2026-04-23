
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://serverest.dev',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    experimentalRunAllSpecs: true,
    env: {
      // Credenciais são lidas de cypress.env.json localmente 
      // ou de variáveis de ambiente no GitHub Actions
    },
    // Desabilitar interface gráfica para testes de API
    video: false,
    screenshotOnRunFailure: false,
    // Configuração do reporter Mochawesome
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    // Timeout customizado para requisições API
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    // Retry para lidar com rate limiting
    retries: {
      runMode: 1,
      openMode: 0
    }
  }
})
