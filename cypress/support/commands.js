// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const objetoJson = require('../fixtures/object.json') // carrega o objeto base do fixture

Cypress.Commands.add('api_addObject', (overrides = {}) => {  
 // aplica overrides (se tiver)
  const finalPayload = { ...objetoJson, ...overrides }

    cy.request({
        method: 'POST',
        url: "https://api.restful-api.dev/objects",
        failOnStatusCode: false,
        body: finalPayload
    }).then((response) => {
    return { response, finalPayload } // devolve os dois
  })
})



Cypress.Commands.add('api_getObjects', () => {
  
    cy.request({
        method: 'GET',
        url: "https://api.restful-api.dev/objects",
        failOnStatusCode: false
    })
})

Cypress.Commands.add('api_updateObject', (objectId) => {
  
    cy.request({
        method: 'PUT',
        url: "https://api.restful-api.dev/objects/" + objectId,
        failOnStatusCode: false,
        body: objetoJson
    })
})

Cypress.Commands.add('api_getObjectById', (objectId) => {
  
    cy.request({
        method: 'GET',
        url: "https://api.restful-api.dev/objects/" + objectId,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('api_deleteObject', (objectId) => {
  
    cy.request({
        method: 'DELETE',
        url: "https://api.restful-api.dev/objects/" + objectId,
        failOnStatusCode: false
    })
})


//Compara se todos os campos do objeto enviado na request estão presentes no response com os mesmos valores.
Cypress.Commands.add('compareRequestWithResponse', (requestBody, responseBody) => {
  const compare = (req, res) => {
    Object.keys(req).forEach((key) => {
      const expectedValue = req[key]
      const actualValue = res[key]

      if (typeof expectedValue === 'object' && expectedValue !== null) {
        // Se o response não tiver a key, ignora (a API pode descartar)
        if (res.hasOwnProperty(key)) {
          expect(actualValue).to.be.an('object')
          compare(expectedValue, actualValue) // recursão
        }
      } else {
        // Só valida se o response realmente tiver esse campo
        if (res.hasOwnProperty(key)) {
          expect(actualValue).to.equal(expectedValue)
        }
      }
    })
  }

  compare(requestBody, responseBody)
})
