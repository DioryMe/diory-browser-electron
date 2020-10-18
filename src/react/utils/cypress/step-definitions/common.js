import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const url = 'http://localhost:3300'

Given('I am at home', () => {
  cy.visit(url)
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

When('I take {string} in focus', (dioryName) => {
  cy.contains(dioryName).click()
})

Then('I see {string} diory', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})
