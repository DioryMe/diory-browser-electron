import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

// GIVEN

Given('I am at home', () => {
  cy.visit('/')
})

Given('I select {word} button', (toolName) => {
  cy.get(`div[data-testid=${toolName}-button]`).click()
})

Given('I select {string}', (testId) => {
  cy.get(`div[data-testid=${testId}]`).click()
})

// WHEN

When('I select and take {string} in focus', (dioryName) => {
  cy.get('div[draggable=true]').contains(dioryName).click()
  cy.get('div[draggable=true]').contains(dioryName).click()
})

When('I select {string} diory', (dioryName) => {
  cy.get('div[draggable=true]').contains(dioryName).click()
})

When('I take {string} in focus', (dioryName) => {
  cy.get('div[draggable=true]').contains(dioryName).click()
})

When('I click {word} button', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

When('I click {string} focus diory', (dioryName) => {
  cy.get('svg[data-icon=hand]').click({ force: true })
})

When('I type {string} in search bar', (searchString) => {
  cy.get('input#NavigationSearch').type(searchString)
})

// THEN

Then('I see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})

Then('I do not see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 0)
})

// FIXME: Used only by hand tool, many other data-testid steps exists, should we use only this?
Then('I see {string}', (testId) => {
  cy.get(`div[data-testid=${testId}]`).should('have.length', 1)
})

Then('I see {word} button', (buttonName) => {
  cy.get(`div[data-testid=${buttonName}-button]`).should('have.length', 1)
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
  cy.get(`div#${dioryId} > div:first-child > div:first-child`).should('have.css', cssKey, cssValue)
})
