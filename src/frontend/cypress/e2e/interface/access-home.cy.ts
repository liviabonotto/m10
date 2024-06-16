describe('Acessa a aplicação em Home', () => {
  it('Verifica se a página Home é acessada ao iniciar a aplicação', () => {
    // Acessa a aplicação
    cy.visit('http://localhost:5173/')
    
    // Verifica a mostragem correta do conteúdo da página Home
    cy.get('[cy-testid="home-open"]').should('exist')
  })
})