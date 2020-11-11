import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I click {string} marker', (dioryName) => {
  // FIXME: This doesn't use dioryName at all
  cy.get('img[data-testid=linked-diory-marker]').first().click()
})

When('I doubleclick {string} marker', (dioryName) => {
  // FIXME: This doesn't use dioryName at all
  cy.get('img[data-testid=linked-diory-marker]').first().dblclick()
})

Then('I see {int} marker(s) on map', (markerCount) => {
  cy.get('img[data-testid=linked-diory-marker]').should('have.length', markerCount - 1)
  cy.get('img[data-testid=diory-marker]').should('have.length', 1)
})

Then('I see {string} popup on map', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.get('div.leaflet-popup').should('have.length', 1)
  cy.contains(dioryName).should('have.length', 1)
})
