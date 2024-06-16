describe('Entra em um projeto', () => {
    it('Clica em um card de projeto e verifica o redirecionamento', () => {
        // Acessa a aplicação
        cy.visit('http://localhost:5173/')
        
        // Verifica a existência de um projeto e clica
        cy.get('[cy-testid="project-card"]').should('exist')
        cy.get('[cy-testid="project-card"]').first().click()

        // Verifica o redirecionamento para a página de projeto
        cy.get('[cy-testid="project-page"]')
    })
  })