
describe('My First Test', () => {
  it('Browse some diories', () => {
    cy.visit('http://localhost:3300')

    cy.contains('Diory 12').should('not.be.visible')
    cy.contains('Diory 1').should('be.visible')

    cy.contains('Diory 1').click()

    cy.contains('Diory 12').should('be.visible')
    cy.contains('Diory 1').should('be.visible')
  })
})
