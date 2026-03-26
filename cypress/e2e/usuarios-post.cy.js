/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Criação de Usuário (POST /usuarios)
 * Campos Obrigatórios: nome, email, password, administrador
 * Descrição: Este arquivo valida a criação de usuários garantindo que todos os
 * campos obrigatórios exigidos pelo desafio sejam enviados e validados.
 */

describe('POST /usuarios - Cadastrar Usuário', () => {
  const createdUserIds = []

  // DESAFIO: Gerenciamento de massa de dados. 
  // Usuários criados durante os testes são removidos ao final para manter a sanidade.
  after(() => {
    createdUserIds.forEach((id) => {
      cy.deleteUser(id)
    })
  })

  /**
   * REQUISITO: Criar um usuário com todos os campos obrigatórios (nome, email, password, administrador).
   * Status esperado: 201 Created.
   */
  it('Deve cadastrar um novo usuário com dados válidos', () => {
    cy.generateUniqueEmail().then((email) => {
      const newUser = {
        nome: 'Novo Usuário QA',
        email: email,
        password: 'senha123',
        administrador: 'true'
      }

      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: newUser
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
        expect(response.body._id).to.be.a('string').and.not.be.empty
        createdUserIds.push(response.body._id)
      })
    })
  })

  it('Deve cadastrar um usuário não-administrador', () => {
    cy.generateUniqueEmail().then((email) => {
      const nonAdminUser = {
        nome: 'Usuário Comum',
        email: email,
        password: 'senha123',
        administrador: 'false'
      }

      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: nonAdminUser
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
        createdUserIds.push(response.body._id)
      })
    })
  })

  /**
   * REQUISITO: Validação de regras de negócio (Email deve ser único).
   */
  it('Deve retornar 400 ao cadastrar com email já utilizado', () => {
    cy.createUser().then((existingUser) => {
      createdUserIds.push(existingUser._id)

      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Outro Nome',
          email: existingUser.email,
          password: 'outrasenha',
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('message', 'Este email já está sendo usado')
      })
    })
  })

  /**
   * REQUISITO: Validação de Campos Obrigatórios (nome, email, password, administrador).
   * Abaixo validamos cada campo individualmente conforme pede o desafio.
   */
  it('Deve retornar 400 quando campo "nome" não é informado', () => {
    cy.generateUniqueEmail().then((email) => {
      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          email: email,
          password: 'teste123',
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('nome')
      })
    })
  })

  it('Deve retornar 400 quando campo "email" não é informado', () => {
    cy.api({
      method: 'POST',
      url: '/usuarios',
      body: {
        nome: 'Sem Email',
        password: 'teste123',
        administrador: 'true'
      }
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('email')
    })
  })

  it('Deve retornar 400 quando campo "password" não é informado', () => {
    cy.generateUniqueEmail().then((email) => {
      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Sem Password',
          email: email,
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('password')
      })
    })
  })

  it('Deve retornar 400 quando campo "administrador" não é informado', () => {
    cy.generateUniqueEmail().then((email) => {
      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Sem Admin',
          email: email,
          password: 'teste123'
        }
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('administrador')
      })
    })
  })

  it('Deve retornar 400 quando o corpo da requisição está vazio', () => {
    cy.api({
      method: 'POST',
      url: '/usuarios',
      body: {}
    }).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body).to.have.property('nome')
      expect(response.body).to.have.property('email')
      expect(response.body).to.have.property('password')
      expect(response.body).to.have.property('administrador')
    })
  })

  /**
   * REQUISITO: Geração de evidências e validação de Schema.
   */
  it('Deve validar o schema da resposta de cadastro bem-sucedido', () => {
    cy.generateUniqueEmail().then((email) => {
      cy.api({
        method: 'POST',
        url: '/usuarios',
        body: {
          nome: 'Schema Test User',
          email: email,
          password: 'teste123',
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        // Valida que a resposta tem exatamente as propriedades esperadas pelo desafio
        expect(Object.keys(response.body)).to.have.lengthOf(2)
        expect(response.body).to.have.all.keys('message', '_id')
        expect(response.body.message).to.be.a('string')
        expect(response.body._id).to.be.a('string')
        createdUserIds.push(response.body._id)
      })
    })
  })
})
