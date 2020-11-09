import { When } from 'cypress-cucumber-preprocessor/steps'

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
