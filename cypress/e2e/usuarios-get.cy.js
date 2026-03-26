/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Listar e Buscar Usuários (GET /usuarios e GET /usuarios/{id})
 * Descrição: Este arquivo valida a recuperação de dados de usuários, permitindo
 * a listagem total, busca por filtros (nome/email) e busca por ID específico.
 */

describe('GET /usuarios - Listar e Buscar Usuários', () => {
  let testUser

  before(() => {
    // DESAFIO: Garantir massa de dados para os testes de consulta.
    cy.createUser().then((user) => {
      testUser = user
    })
  })

  after(() => {
    if (testUser && testUser._id) {
      cy.deleteUser(testUser._id)
    }
  })

  describe('GET /usuarios - Listar todos', () => {
    /**
     * REQUISITO: Retornar uma lista de todos os usuários.
     */
    it('Deve retornar a lista de usuários cadastrados', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios'
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('quantidade')
        expect(response.body.quantidade).to.be.a('number')
        expect(response.body.quantidade).to.be.greaterThan(0)
        expect(response.body).to.have.property('usuarios')
        expect(response.body.usuarios).to.be.an('array')
        expect(response.body.usuarios.length).to.be.greaterThan(0)
      })
    })

    /**
     * REQUISITO: Validar a estrutura de dados (Schema) dos usuários retornados.
     */
    it('Deve validar a estrutura/schema de cada usuário retornado', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios'
      }).then((response) => {
        expect(response.status).to.eq(200)
        const usuario = response.body.usuarios[0]
        // DESAFIO: Garantir que cada usuário possui os campos obrigatórios citados no desafio.
        expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
        expect(usuario.nome).to.be.a('string')
        expect(usuario.email).to.be.a('string')
        expect(usuario.password).to.be.a('string')
        expect(usuario.administrador).to.be.a('string')
        expect(usuario._id).to.be.a('string')
      })
    })

    /**
     * REQUISITO: Busca filtrada por parâmetros de query string.
     */
    it('Deve filtrar usuários por nome', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios',
        qs: { nome: testUser.nome }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.be.greaterThan(0)
        response.body.usuarios.forEach((user) => {
          expect(user.nome).to.eq(testUser.nome)
        })
      })
    })

    it('Deve filtrar usuários por email', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios',
        qs: { email: testUser.email }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(1)
        expect(response.body.usuarios[0].email).to.eq(testUser.email)
      })
    })

    it('Deve retornar lista vazia para filtro sem resultados', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios',
        qs: { nome: 'UsuarioInexistente_XYZ_99999' }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.quantidade).to.eq(0)
        expect(response.body.usuarios).to.be.an('array').that.is.empty
      })
    })
  })

  describe('GET /usuarios/{_id} - Buscar por ID', () => {
    /**
     * REQUISITO: Buscar os detalhes de um usuário específico via ID.
     */
    it('Deve retornar os dados do usuário pelo ID', () => {
      cy.api({
        method: 'GET',
        url: `/usuarios/${testUser._id}`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('nome', testUser.nome)
        expect(response.body).to.have.property('email', testUser.email)
        expect(response.body).to.have.property('password', testUser.password)
        expect(response.body).to.have.property('administrador', testUser.administrador)
        expect(response.body).to.have.property('_id', testUser._id)
      })
    })

    it('Deve retornar 400 para ID inexistente', () => {
      cy.api({
        method: 'GET',
        url: '/usuarios/idInexistente123'
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Usuário não encontrado')
      })
    })
  })
})
