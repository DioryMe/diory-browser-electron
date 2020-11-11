import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

// GIVEN

Given('I am at home', () => {
  cy.visit('/')
})

Given('I select {word} button', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).click()
})

// WHEN

When('I take {string} in focus', (dioryName) => {
  cy.contains(dioryName).click()
})

When('click {word} button', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

When('I type {string} in search bar', (searchString) => {
  cy.get('input#NavigationSearch').type(searchString)
})

// THEN

Then('I see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})

Then("I don't see {string} in view", (dioryName) => {
  cy.contains(dioryName).should('have.length', 0)
})

Then('I select {word} lens', (lensName) => {
  cy.get(`span[data-testid=${lensName}-lens]`).should('have.attr', 'aria-selected', 'false')
  cy.get(`span[data-testid=${lensName}-lens]`).click()
  cy.get(`span[data-testid=${lensName}-lens]`).should('have.attr', 'aria-selected', 'true')
})

Then('I do not see {word} to {word} button', (word1, word2) => {
  cy.get(`button[${word1}-${word2}]`).should('have.length', 0)
})

Then('{word} tool is active', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).should('have.length', 0)
  cy.get(`div[data-testid=${toolName}-button--active]`).should('have.length', 1)
})

Then('{string} has {string} as {string}', (dioryId, cssValue, cssKey) => {
  cy.get(`div#${dioryId} > div:first-child`).should('have.css', cssKey, cssValue)
})
