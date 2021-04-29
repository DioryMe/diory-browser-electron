import { When } from 'cypress-cucumber-preprocessor/steps'

When('I drag {string} into hand', (dioryId) => {
  cy.get(`#${dioryId}`).drag('[data-testid="hand"]')
})
