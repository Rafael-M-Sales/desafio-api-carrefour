
// ***********************************************
// Comandos customizados para testes da API ServeRest
// ***********************************************

/**
 * Gera um email único usando timestamp para evitar duplicatas
 */
Cypress.Commands.add('generateUniqueEmail', () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  return `user_${timestamp}_${random}@qa.com.br`
})

/**
 * Cria um usuário e retorna os dados + _id
 * @param {Object} overrides - Campos opcionais para sobrescrever dados padrão
 */
Cypress.Commands.add('createUser', (overrides = {}) => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 10000)
  const defaultUser = {
    nome: `QA User ${timestamp}`,
    email: `user_${timestamp}_${random}@qa.com.br`,
    password: 'teste123',
    administrador: 'true'
  }
  const userData = { ...defaultUser, ...overrides }

  return cy.api({
    method: 'POST',
    url: '/usuarios',
    body: userData
  }).then((response) => {
    return {
      ...userData,
      _id: response.body._id,
      status: response.status
    }
  })
})

/**
 * Realiza login e retorna objeto com token, status e mensagem
 * @param {string} email
 * @param {string} password
 */
Cypress.Commands.add('doLogin', (email, password) => {
  return cy.api({
    method: 'POST',
    url: '/login',
    body: { email, password }
  }).then((response) => {
    return {
      token: response.body.authorization,
      status: response.status,
      message: response.body.message
    }
  })
})

/**
 * Cache de Sessão: Realiza login e armazena o token para múltiplos testes
 * @param {string} email
 * @param {string} password
 * @param {string} sessionName - Nome único para identificar a sessão
 */
Cypress.Commands.add('loginSession', (email, password, sessionName = 'user-session') => {
  cy.session(sessionName, () => {
    cy.doLogin(email, password).then((auth) => {
      expect(auth.status).to.eq(200)
      Cypress.env('token', auth.token)
    })
  })
})

/**
 * Atalho para login como Administrador Padrão
 */
Cypress.Commands.add('loginAsAdmin', () => {
  const email = Cypress.env('adminEmail') || 'fulano@qa.com.br'
  const password = Cypress.env('adminPassword') || 'teste'
  cy.loginSession(email, password, 'admin-session')
})

/**
 * Deleta um usuário pelo ID (cleanup)
 * @param {string} userId
 */
Cypress.Commands.add('deleteUser', (userId) => {
  return cy.api({
    method: 'DELETE',
    url: `/usuarios/${userId}`,
    failOnStatusCode: false
  })
})

/**
 * Wrapper para cy.request que não falha em status codes de erro
 * Útil para testar cenários negativos
 */
Cypress.Commands.add('api', (options) => {
  return cy.request({
    ...options,
    failOnStatusCode: false
  })
})
