/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Atualizar Usuário (PUT /usuarios/{id})
 * Descrição: Este arquivo valida a atualização de dados cadastrais de usuários
 * existentes, garantindo a integridade dos dados e o comportamento de "upsert".
 */

describe('PUT /usuarios/{_id} - Editar Usuário', () => {
  const createdUserIds = []

  after(() => {
    createdUserIds.forEach((id) => {
      cy.deleteUser(id)
    })
  })

  /**
   * REQUISITO: Atualizar os dados de um usuário específico.
   * Status esperado: 200 OK.
   */
  it('Deve atualizar um usuário existente com sucesso', () => {
    cy.createUser().then((user) => {
      createdUserIds.push(user._id)

      cy.generateUniqueEmail().then((newEmail) => {
        cy.api({
          method: 'PUT',
          url: `/usuarios/${user._id}`,
          body: {
            nome: 'Nome Atualizado',
            email: newEmail,
            password: 'novaSenha123',
            administrador: 'true'
          }
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
        })
      })
    })
  })

  /**
   * REQUISITO: Verificar a persistência dos dados após a atualização.
   */
  it('Deve verificar que os dados foram realmente atualizados', () => {
    cy.createUser().then((user) => {
      createdUserIds.push(user._id)

      cy.generateUniqueEmail().then((newEmail) => {
        const updatedData = {
          nome: 'Dados Verificados',
          email: newEmail,
          password: 'senhaVerificada',
          administrador: 'false'
        }

        cy.api({
          method: 'PUT',
          url: `/usuarios/${user._id}`,
          body: updatedData
        }).then(() => {
          // Busca o usuário atualizado para verificar se os dados persistem
          cy.api({
            method: 'GET',
            url: `/usuarios/${user._id}`
          }).then((getResponse) => {
            expect(getResponse.status).to.eq(200)
            expect(getResponse.body.nome).to.eq(updatedData.nome)
            expect(getResponse.body.email).to.eq(updatedData.email)
            expect(getResponse.body.administrador).to.eq(updatedData.administrador)
          })
        })
      })
    })
  })

  /**
   * REQUISITO: Comportamento de criação caso o ID não exista (Endpoint /users/{id}).
   * Status esperado: 201 Created.
   */
  it('Deve criar um novo usuário quando o ID não existe (upsert)', () => {
    cy.generateUniqueEmail().then((email) => {
      const idInexistente = 'idQueNaoExiste123'

      cy.api({
        method: 'PUT',
        url: `/usuarios/${idInexistente}`,
        body: {
          nome: 'Usuário Criado via PUT',
          email: email,
          password: 'teste123',
          administrador: 'true'
        }
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
        expect(response.body).to.have.property('_id')
        createdUserIds.push(response.body._id)
      })
    })
  })

  /**
   * REQUISITO: Validação de email duplicado em atualizações.
   */
  it('Deve retornar 400 ao tentar atualizar com email já utilizado por outro usuário', () => {
    cy.createUser().then((user1) => {
      createdUserIds.push(user1._id)

      cy.createUser().then((user2) => {
        createdUserIds.push(user2._id)

        cy.api({
          method: 'PUT',
          url: `/usuarios/${user2._id}`,
          body: {
            nome: 'Tentativa Duplicata',
            email: user1.email,
            password: 'teste123',
            administrador: 'true'
          }
        }).then((response) => {
          expect(response.status).to.eq(400)
          expect(response.body).to.have.property('message', 'Este email já está sendo usado')
        })
      })
    })
  })

  /**
   * REQUISITO: Validação de obrigatoriedade de campos em operações de edição.
   */
  it('Deve retornar 400 quando campos obrigatórios não são informados', () => {
    cy.createUser().then((user) => {
      createdUserIds.push(user._id)

      cy.api({
        method: 'PUT',
        url: `/usuarios/${user._id}`,
        body: {}
      }).then((response) => {
        expect(response.status).to.eq(400)
        expect(response.body).to.have.property('nome')
        expect(response.body).to.have.property('email')
        expect(response.body).to.have.property('password')
        expect(response.body).to.have.property('administrador')
      })
    })
  })
})
