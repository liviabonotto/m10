describe('Mover pacotes', () => {
    it('Move um card de pacote para outra coluna', () => {
        // Acessa página de projeto
        cy.visit('http://localhost:5173/#/project')
        
        // Verifica a existência de um card na coluna de Desenvolvimento
        cy.get('[cy-testid="pkgs-column"]')
        .get('[cy-testid="column-title"]')
        .contains('Desenvolvendo')
        .get('[cy-testid="pkg-card"]').should('exist')

        // Clica no botão de mover card
        cy.get('[cy-testid="pkgs-column"]')
        .get('[cy-testid="column-title"]').contains('Desenvolvendo')
        .get('[cy-testid="pkg-card"]').last()
        .get('[cy-testid="btn"]').contains('Mover para').click()

        // Verifica a ativação de um modal de confirmação e confirma a ação
        cy.get('[cy-testid="pkg-alert-modal"]').should('exist')
        cy.get('[cy-testid="btn"]').last().contains('CONFIRMAR').click()

        // Verifica a existência de um novo card na coluna de Develop
        cy.get('[cy-testid="pkgs-column"]')
        .get('[cy-testid="column-title"]')
        .contains('Develop')
        .get('[cy-testid="pkg-card"]').should('exist')

    })
  })