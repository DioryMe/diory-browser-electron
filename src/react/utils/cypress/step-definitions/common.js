import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

const url = 'http://localhost:3300'

// GIVEN

Given('I am at home', () => {
  cy.visit(url)
})

Given('I select {word} button', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).click()
})

// WHEN

When('I take {string} in focus', (dioryName) => {
  cy.contains(dioryName).click()
})

When('I navigate(d) backward', () => {
  cy.get('button[data-testid="navigate-left"]').click()
})

When('I navigate(d) forward', () => {
  cy.get('button[data-testid="navigate-right"]').click()
})

When('I navigate(d) to home', () => {
  cy.get('button[data-testid="home"]').click()
})

When('I navigate(d) to right', () => {
  cy.get('div[data-testid="navigate-right"]').click()
})

When('I navigate(d) to left', () => {
  cy.get('div[data-testid="navigate-left"]').click()
})

// THEN

Then('{word} tool is active', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).should('have.length', 0)
  cy.get(`div[data-testid=${toolName}-button--active]`).should('have.length', 1)
})

Then('{word} tool dialog is opened', (toolName) => {
  cy.contains(`${toolName} diory`).should('have.length', 1)
})

Then('I see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})

Then('I do not see {word} to {word} button', (word1, word2) => {
  cy.get(`button[${word1}-${word2}]`).should('have.length', 0)
})
