import { When, Then } from 'cypress-cucumber-preprocessor/steps'

// WHEN

When('I type {string} in search input', (searchString) => {
  cy.get('input[data-testid=search-input]').type(searchString)
})

// THEN

Then('I see search bar', () => {
  cy.get(`div[data-testid=search-bar]`).should('have.length', 1)
})

Then("I don't see search bar", () => {
  cy.get(`div[data-testid=search-bar]`).should('have.length', 0)
})
