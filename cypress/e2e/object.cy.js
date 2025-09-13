describe('Testes API', () => {
  let objectId

    it('Criar novo objeto e validar campos', () => {
      //acrescenta o campo color com valor black no json default
      cy.api_addObject({ color: 'black' }).then(({ response, finalPayload }) => {
      expect(response.status).to.equal(200)

      objectId = response.body.id
      
      cy.compareRequestWithResponse(finalPayload, response.body) // compara payload real x response
    
      cy.screenshot() //screenshot da tela
    })
  })
  

  it('Buscar objetos', () => {
    cy.api_getObjects().then((response) => {
      expect(response.status).to.equal(200)
      cy.screenshot() //screenshot da tela
    })
  })

  it('Alterar objeto', () => {
    cy.api_updateObject(objectId).then((response) => {
      expect(response.status).to.equal(200)
      cy.screenshot() //screenshot da tela
    })
  })

   it('Alterar objeto - Id inválido', () => {
    let objectIdInvalido = 'xxxxx'
    cy.api_updateObject(objectIdInvalido).then((response) => {
      expect(response.status).to.equal(404)
      cy.screenshot() //screenshot da tela
    })
  })

  it('Buscar objeto por ID', () => {
    cy.api_getObjectById(objectId).then((response) => {
      expect(response.status).to.equal(200)
      cy.screenshot() //screenshot da tela
    })
  })

  it('Buscar objeto por ID - Id inválido', () => {
    let objectIdInvalido = 'xxxxx'
    cy.api_getObjectById(objectIdInvalido).then((response) => {
      expect(response.status).to.equal(404)
      cy.screenshot() //screenshot da tela
    })
  })

  it('Deletar objeto', () => {
    cy.api_deleteObject(objectId).then((response) => {
      expect(response.status).to.equal(200)
      cy.screenshot() //screenshot da tela
    })
  })

it('Deletar objeto - Id inválido', () => {
    let objectIdInvalido = 'xxxxx'
    cy.api_deleteObject(objectIdInvalido).then((response) => {
      expect(response.status).to.equal(404)
      cy.screenshot() //screenshot da tela
    })
  })



})
