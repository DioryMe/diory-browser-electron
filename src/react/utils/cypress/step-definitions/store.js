import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('{string} diory {word} in the store', (dioryText, isOrNot) => {
  cy.window()
    .its('diographInStore')
    .should(($p) => {
      const diory = Object.values($p).filter((diory) => diory.text === dioryText)[0]
      isOrNot === 'is' ? expect(diory.text).to.equal(dioryText) : expect(diory).not.to.exist
    })
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

Then('{string} diory {word} in the hand', (dioryText, isOrNot) => {
  cy.window().then((window) => {
    const diory = Object.values(window.diographInStore).filter(
      (diory) => diory.text === dioryText
    )[0]
    isOrNot === 'is'
      ? // How hand is object?!!!? It should be an array and Object.values shouldn't be necessary...
        expect(Object.values(window.handInStore)).to.include(diory.id)
      : expect(Object.values(window.handInStore)).not.to.include(diory.id)
  })
})
