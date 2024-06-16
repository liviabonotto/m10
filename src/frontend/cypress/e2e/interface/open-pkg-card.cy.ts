describe('Abrir um pacote', () => {
    it('Clica em um card de pacote e verifica a abertura do modal', () => {
      // Acessa página de projeto
      cy.visit('http://localhost:5173/#/project')
      
      // Verifica a existência de um card de pacote e clica
      cy.get('[cy-testid="pkg-card"]').should('exist')
      cy.get('[cy-testid="pkg-card"]').first().click()

      // Verifica a ativação do modal com informações do card
      cy.get('[cy-testid="modal-card"]').should('exist')
    })
  })