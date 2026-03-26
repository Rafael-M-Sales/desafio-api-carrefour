/// <reference types="cypress" />

/**
 * DESAFIO CARREFOUR - API TESTING
 * Requisito: Excluir Usuário (DELETE /usuarios/{id})
 * Descrição: Este arquivo valida a exclusão de usuários e a garantia de que o
 * registro não existe mais no sistema após a operação.
 */

describe('DELETE /usuarios/{_id} - Excluir Usuário', () => {

  /**
   * REQUISITO: Excluir um usuário existente.
   * Status esperado: 200 OK.
   */
  it('Deve excluir um usuário existente com sucesso', () => {
    cy.createUser().then((user) => {
      cy.api({
        method: 'DELETE',
        url: `/usuarios/${user._id}`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('message', 'Registro excluído com sucesso')
      })
    })
  })

  /**
   * REQUISITO: Verificar a confirmação da exclusão (tentar buscar o ID deletado).
   */
  it('Deve verificar que o usuário foi realmente excluído', () => {
    cy.createUser().then((user) => {
      cy.api({
        method: 'DELETE',
        url: `/usuarios/${user._id}`
      }).then(() => {
        // DESAFIO: Confirmar que o usuário não é mais retornado pelo sistema.
        cy.api({
          method: 'GET',
          url: `/usuarios/${user._id}`,
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(400)
          expect(getResponse.body).to.have.property('message', 'Usuário não encontrado')
        })
      })
    })
  })

  it('Deve retornar 200 ao tentar excluir um usuário inexistente', () => {
    cy.api({
      method: 'DELETE',
      url: '/usuarios/idInexistente999',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('message', 'Nenhum registro excluído')
    })
  })

  /**
   * REQUISITO: Garantir a limpeza do ambiente ao excluir múltiplos usuários.
   */
  it('Deve excluir múltiplos usuários independentes com sucesso', () => {
    cy.createUser().then((user1) => {
      cy.createUser().then((user2) => {
        cy.api({
          method: 'DELETE',
          url: `/usuarios/${user1._id}`
        }).then((res1) => {
          expect(res1.status).to.eq(200)
        })

        cy.api({
          method: 'DELETE',
          url: `/usuarios/${user2._id}`
        }).then((res2) => {
          expect(res2.status).to.eq(200)
        })
      })
    })
  })
})
