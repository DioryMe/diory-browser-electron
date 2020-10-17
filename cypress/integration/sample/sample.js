import { Given } from "cypress-cucumber-preprocessor/steps";
import { When } from "cypress-cucumber-preprocessor/steps";
import { Then } from "cypress-cucumber-preprocessor/steps";

const url = 'http://localhost:3300'

Given('I am at home', () => {
  cy.visit(url)
})

When('I take {word} {int} in focus', (idPrefix, id) => {
  cy.get(`div#${idPrefix}${id}`).click()
})

Then('I see {word} {int} in view', (idPrefix, id) => {
  cy.get(`div#${idPrefix}${id}`).should('have.length', 1)
})
