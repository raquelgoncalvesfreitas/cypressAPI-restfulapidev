const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    html: true,
    json: false
    
  },  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here      
    },
    env: {
      requestMode: true, //para mostrar o modo de requisição e response
    },
  },
});
