import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const url = 'http://localhost:3300'

Given('I am at home', () => {
  cy.visit(url)
  // cy.waitForReact()
})

Given('I select {word} button', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).click()
})

Then('{word} tool is active', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).should('have.length', 0)
  cy.get(`div[data-testid=${toolName}-button--active]`).should('have.length', 1)
})

Then('{word} tool dialog is opened', (toolName) => {
  cy.contains(`${toolName} diory`).should('have.length', 1)
})

When('I take {word} {int} in focus', (idPrefix, id) => {
  cy.get(`div#${idPrefix}${id}`).click()
})

Then('I see {word} {int} in view', (idPrefix, id) => {
  cy.get(`div#${idPrefix}${id}`).should('have.length', 1)
})

Then('I see {int} linked diory(s)', (amount) => {
  // CURRENTLY DOESN'T WORK
  // cy.react('Diory').should('have.length', amount)
  // expect(this.app.find('Diory')).toHaveLength(amount)
})

Then('I see {string} diory', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})

Then("I don't see {string} diory", (dioryName) => {
  cy.contains(dioryName).should('have.length', 0)
})
