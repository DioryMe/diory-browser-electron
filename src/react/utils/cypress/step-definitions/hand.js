import { When } from 'cypress-cucumber-preprocessor/steps'

When('I click {string} diory in hand', (dioryId) => {
  cy.get(`#hand-${dioryId}`).click()
})

When('I drag focus diory into hand', (dioryId) => {
  cy.get('svg[data-icon=hand]').drag('[data-testid="hand"]')
})

When('I drag {string} into hand', (dioryName) => {
  cy.get(`[draggable=true]`).contains(dioryName).drag('[data-testid="hand"]')
})

When('I drag {string} to {string}', (fromDioryId, toDioryId) => {
  cy.get(`#${fromDioryId}`).drag(`#${toDioryId}`)
})

When('I drag {string} to story', (fromDioryId) => {
  cy.get(`#${fromDioryId}`).drag('[data-testid=story]')
})
