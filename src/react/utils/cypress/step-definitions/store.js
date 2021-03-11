import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('{string} diory {word} in the store', (dioryId, isOrNot) => {
  const haveKeysOrNot = isOrNot === 'is' ? 'have.any.keys' : 'not.have.any.keys'
  cy.window().its('diographInStore').should(haveKeysOrNot, dioryId)
})

Then('{string} link {word} in the store', (linkId, isOrNot) => {
  cy.window()
    .its('diographInStore')
    .should(($p) => {
      const linksInStore = Object.values($p)
        .map((diory) => (diory.links ? Object.keys(diory.links) : []))
        .flat()
      isOrNot === 'is'
        ? expect(linksInStore).to.include(linkId)
        : expect(linksInStore).not.to.include(linkId)
    })
})
