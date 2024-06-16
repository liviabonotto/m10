describe('Criação de novos pacotes', () => {
    it('Clica em um card de projeto e verifica o redirecionamento', () => {
        // Acessa a aplicação
        cy.visit('http://localhost:5173/')
        
        // Verifica a existência de um projeto e clica
        cy.get('[cy-testid="project-card"]').should('exist')
        cy.get('[cy-testid="project-card"]').first().click()

        // Verifica o redirecionamento para a página de projeto
        cy.get('[cy-testid="project-page"]')
    })

    it('Acessa a opção de cria novos pacotes', () => {
        // Acessa página de projeto
        cy.visit('http://localhost:5173/#/project')

        // Verifica a Existência de um botão de criação de pacotes e clica
        cy.get('[cy-testid="btn"]').contains('NOVO PACOTE').click()

        // Verifica a ativação do modal ce criação de pacotes
        cy.get('[cy-testid="add-pkgs-modal"]').should('exist')
    })

    it('Preenche os campos de criação de pacote e cria o pacote',() => {

        // Acessa página de projeto
        cy.visit('http://localhost:5173/#/project')

        // Verifica a Existência de um botão de criação de pacotes e clica
        cy.get('[cy-testid="btn"]').contains('NOVO PACOTE').click()

        // Verifica a ativação do modal ce criação de pacotes
        cy.get('[cy-testid="add-pkgs-modal"]')

        // Verifica se o modal de criação de pacotes foi ativado, preenche os campos necessários e ativa a função de criar um novo pacote o novo pacote
        cy.get('[cy-testid="add-pkgs-modal"]').should('exist')
            .get('[cy-testid="pkg-name-input"]').type('feature/cypress-create-pkg') 
            .get('[cy-testid="pkg-type-input"]').click()
                .get('[cy-testid="menu-item"]').contains('Feature').click() 
            .get('[cy-testid="pkg-description-input"]').type('teste de criação de novo card de pacote com cypress')
            .get('[cy-testid="btn"]').contains('Continuar').click()
            .get('[cy-testid="list-modal"]').should('exist')
                .get('[cy-testid="list-item"]').first().click()
            .get('[cy-testid="btn"]').contains('Criar Pacote').click()


    })
})