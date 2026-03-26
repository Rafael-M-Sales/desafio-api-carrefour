/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Autenticação via Token JWT
 * Endpoint: POST /login
 * Descrição: Este arquivo valida a autenticação de usuários, fundamental para
 * obter o token JWT necessário para operações protegidas em outros endpoints.
 */

describe('POST /login - Autenticação', () => {
  let testUser

  before(() => {
    // DESAFIO: Para testar o login, primeiro garantimos a existência de um usuário válido.
    // O endpoint POST /usuarios é utilizado aqui (Requisito: Endpoint /users).
    cy.createUser().then((user) => {
      testUser = user
    })
  })

  after(() => {
    // Cleanup: Mantém o ambiente limpo após os testes.
    if (testUser && testUser._id) {
      cy.deleteUser(testUser._id)
    }
  })

  /**
   * REQUISITO: Login com credenciais válidas e obtenção de Token JWT.
   * O sistema deve retornar status 200 e um token no campo 'authorization'.
   */
  it('Deve realizar login com credenciais válidas', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        email: testUser.email,
        password: testUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message', 'Login realizado com sucesso')
      // DESAFIO: Validação do Token JWT retornado
      expect(response.body).to.have.property('authorization')
      expect(response.body.authorization).to.include('Bearer')
    })
  })

  it('Deve retornar 401 para email inválido', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        email: 'emailinexistente@qa.com.br',
        password: testUser.password
      }
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
    })
  })

  it('Deve retornar 401 para senha inválida', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        email: testUser.email,
        password: 'senhaErrada123'
      }
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.have.property('message', 'Email e/ou senha inválidos')
    })
  })

  /**
   * REQUISITO: Validação de campos obrigatórios (Email e Password são mandatórios no login).
   */
  it('Deve retornar 400 quando email não é informado', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        password: 'teste123'
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('email')
    })
  })

  it('Deve retornar 400 quando password não é informado', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {
        email: 'test@qa.com.br'
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('password')
    })
  })

  it('Deve retornar 400 quando corpo da requisição está vazio', () => {
    cy.api({
      method: 'POST',
      url: '/login',
      body: {}
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
    })
  })
})
