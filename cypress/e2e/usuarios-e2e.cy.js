/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Fluxo E2E Completo (CRUD)
 * Descrição: Este arquivo demonstra o fluxo de ponta a ponta (End-to-End)
 * cobrindo Criar, Logar, Buscar, Listar, Atualizar e Excluir.
 * Atende ao requisito de "100% de cobertura" para o fluxo principal da API.
 */

describe('E2E - Fluxo CRUD Completo de Usuários', () => {
  let userId
  let userEmail
  const userPassword = 'senhaE2E123'

  /**
   * REQUISITO: Criar usuário (POST /usuarios).
   */
  it('STEP 1: Deve criar um novo usuário', () => {
    cy.generateUniqueEmail().then((email) => {
      userEmail = email

      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Usuário E2E Test',
          email: userEmail,
          password: userPassword,
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('_id')
        userId = response.body._id
      })
    })
  })

  /**
   * REQUISITO: Autenticação (POST /login) com o usuário recém-criado.
   */
  it('STEP 2: Deve realizar login com o usuário criado', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        email: userEmail,
        password: userPassword
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('authorization')
      expect(response.body.authorization).to.include('Bearer')
    })
  })

  /**
   * REQUISITO: Buscar usuário por ID (GET /usuarios/{id}).
   */
  it('STEP 3: Deve buscar o usuário criado pelo ID', () => {
    cy.api({
      method: 'GET',
      url: `/usuarios/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('nome', 'Usuário E2E Test')
      expect(response.body).to.have.property('email', userEmail)
      expect(response.body).to.have.property('_id', userId)
    })
  })

  /**
   * REQUISITO: Listar usuários com filtro (GET /usuarios?_id=x).
   */
  it('STEP 4: Deve encontrar o usuário na listagem geral', () => {
    cy.api({
      method: 'GET',
      url: '/usuarios',
      qs: { _id: userId }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.quantidade).to.eq(1)
      expect(response.body.usuarios[0]._id).to.eq(userId)
    })
  })

  /**
   * REQUISITO: Atualizar usuário (PUT /usuarios/{id}).
   */
  it('STEP 5: Deve atualizar os dados do usuário', () => {
    cy.generateUniqueEmail().then((newEmail) => {
      userEmail = newEmail

      cy.api({
        method: 'PUT',
        url: `/usuarios/${userId}`,
        body: {
          nome: 'Usuário E2E Atualizado',
          email: userEmail,
          password: userPassword,
          administrador: 'false'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
      })
    })
  })

  /**
   * REQUISITO: Validar persistência após atualização.
   */
  it('STEP 6: Deve confirmar que os dados foram atualizados', () => {
    cy.api({
      method: 'GET',
      url: `/usuarios/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('nome', 'Usuário E2E Atualizado')
      expect(response.body).to.have.property('email', userEmail)
      expect(response.body).to.have.property('administrador', 'false')
    })
  })

  /**
   * REQUISITO: Excluir usuário (DELETE /usuarios/{id}).
   */
  it('STEP 7: Deve excluir o usuário', () => {
    cy.api({
      method: 'DELETE',
      url: `/usuarios/${userId}`
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
    })
  })

  /**
   * REQUISITO: Confirmar exclusão final.
   */
  it('STEP 8: Deve confirmar que o usuário foi excluído', () => {
    cy.api({
      method: 'GET',
      url: `/usuarios/${userId}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('message', 'Usuário não encontrado')
    })
  })
})
