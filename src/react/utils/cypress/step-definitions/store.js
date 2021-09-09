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

Then('focusId {word} {string}', (isOrNot, dioryId) => {
  cy.window()
    .its('navigationInStore')
    .should(($p) => {
      isOrNot === 'is'
        ? expect($p.focusId).to.equal(dioryId)
        : expect($p.focusId).not.to.equal(dioryId)
    })
})

Then('selectedDioryId {word} {string}', (isOrNot, dioryId) => {
  cy.window()
    .its('navigationInStore')
    .should(($p) => {
      // eslint-disable-next-line no-nested-ternary
      dioryId === 'null'
        ? expect($p.selectedDioryId).to.equal(null)
        : isOrNot === 'is'
        ? expect($p.selectedDioryId).to.equal(dioryId)
        : expect($p.selectedDioryId).not.to.equal(dioryId)
    })
})
