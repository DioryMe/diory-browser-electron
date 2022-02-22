import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('{string} diory {word} in the store', (dioryText, isOrNot) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .should(({ diograph }) => {
      const diory = Object.values(diograph.diograph).filter((diory) => diory.text === dioryText)[0]
      isOrNot === 'is' ? expect(diory.text).to.equal(dioryText) : expect(diory).not.to.exist
    })
})

Then('{string} link {word} in the store', (linkId, isOrNot) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .should(({ diograph }) => {
      const linksInStore = Object.values(diograph.diograph)
        .map((diory) => (diory.links ? Object.keys(diory.links) : []))
        .flat()
      isOrNot === 'is'
        ? expect(linksInStore).to.include(linkId)
        : expect(linksInStore).not.to.include(linkId)
    })
})

Then('{string} diory {word} in the hand', (dioryText, isOrNot) => {
  cy.window()
    .its('store')
    .invoke('getState')
    .should(({ diograph, tools }) => {
      const diory = Object.values(diograph.diograph).filter((diory) => diory.text === dioryText)[0]
      isOrNot === 'is'
        ? // How hand is object?!!!? It should be an array and Object.values shouldn't be necessary...
          expect(Object.values(tools.hand)).to.include(diory.id)
        : expect(Object.values(tools.hand)).not.to.include(diory.id)
    })
})

Then('I see {string} file in folder', (fileName) => {
  // TODO: Mock or spy ipc client
  // cy.window()
  //   .its('channelsApi.OPEN_FOLDER')
  //   .should((channel) => {
  //     expect(channel).to.be.calledWith(fileName)
  //   })
})
