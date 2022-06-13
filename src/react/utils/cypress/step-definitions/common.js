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
When('I take {string} in focus', (dioryName) => {
  cy.get('div[data-testid=grid-item]').contains(dioryName).click()
})

When('I click {string} button', (buttonName) => {
  cy.get('button').contains(buttonName).click()
})

When('I click {string} focus diory', (dioryName) => {
  cy.get('[data-testid=background]').click()
})

When('I click element with id {string}', (id) => {
  cy.get(`#${id}`).click()
})

When('I type {string} in search bar', (searchString) => {
  cy.get('input#NavigationSearch').type(searchString)
})

When('I select {word} lens', (lensName) => {
  cy.get(`span[data-testid=${lensName}-lens]`).click()
})

// THEN
Then('I see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 1)
})

Then('I do not see {string} in view', (dioryName) => {
  cy.contains(dioryName).should('have.length', 0)
})

Then('I see {int} memories in view', (memoryCount) => {
  cy.get(`[data-testid=grid-item]`).should('have.length', memoryCount)
})

// FIXME: Used only by hand tool, many other data-testid steps exists, should we use only this?
Then('I see {string}', (testId) => {
  cy.get(`[data-testid=${testId}]`).should('have.length', 1)
})

Then('I see {word} button', (buttonName) => {
  cy.get(`[data-testid=${buttonName}-button]`).should('have.length', 1)
})

Then('I do not see {word} button', (buttonName) => {
  cy.get(`[data-testid=${buttonName}-button]`).should('have.length', 0)
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

Then('I see {word} playing', (content) => {
  cy.get(`[data-testid=${content}-content]`).should('have.prop', 'paused', false)
})

Then('I do not see {word} playing', (content) => {
  cy.get(`[data-testid=${content}-content]`).should('have.prop', 'paused', true)
})

Then('I hear {word} sound', (content) => {
  cy.get(`[data-testid=${content}-content]`).should('have.prop', 'muted', false)
})

Then('I do not hear {word} sound', (content) => {
  cy.get(`[data-testid=${content}-content]`).should('have.prop', 'muted', true)
})

Then('I see {word} page {word}', (content, pageNumber) => {
  cy.get(`[data-testid=${content}-content]`)
    .get(`[data-page-number=${pageNumber}]`)
    .should('have.length', 1)
})
