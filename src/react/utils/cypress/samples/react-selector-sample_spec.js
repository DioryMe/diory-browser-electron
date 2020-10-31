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

describe('My First React selector test', () => {
  it('Browse some diories', () => {
    cy.visit('http://localhost:3300')
    cy.waitForReact()

    // `.react` retrieves the DOM-element
    //   - can be clicked, but only DOM-attributes can be inspected
    // .getReact retrieves the Component from React virtual DOM
    //   - can't be clicked, but props can be inspected
    // => some properties are on both, like 'have.length'

    cy.react('Diory').should('have.length', '2')

    // Before clicking anything everything works fine
    // - but after state should be changed, these helpers break down
    cy.getReact('Diory', { props: { diory: { text: 'Diory 1' } } })
      .getProps('diory.latitude')
      .should('eq', '61')
    //  {
    //   key: 'link1',
    //   id: 'diory1',
    //   text: 'Diory 1',
    //   links:
    //    { link11: { id: 'diory11' },
    //      link12: { id: 'diory12' },
    //      link13: { id: 'diory13' },
    //      link14: { id: 'diory14' } },
    //   latitude: '61',
    //   longitude: '26'
    // })

    cy.contains('Diory 12').should('not.be.visible')
    cy.contains('Diory 1').should('be.visible')

    // cy.contains('Diory 1').click()
    cy.react('Diory', { props: { diory: { text: 'Diory 1' } } }).click()

    cy.contains('Diory 12').should('be.visible')
    cy.contains('Diory 1').should('be.visible')

    // App doesn't update properly after the click
    // - this errors "Cannot read property 'ownerDocument' of undefined"
    // cy.react('Diory').should('have.length', '4')
  })
})
