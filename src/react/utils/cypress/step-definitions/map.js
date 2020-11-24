import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I click {string} marker', (dioryName) => {
  // FIXME: This doesn't use dioryName at all
  cy.get('img[data-testid=linked-diory-marker]').first().click()
})

Then('I click {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.contains(dioryName).click()
})

Then('I see {int} marker(s) on map/timeline', (markerCount) => {
  if (markerCount > 0) {
    cy.get('img[data-testid=linked-diory-marker]').should('have.length', markerCount - 1)
    cy.get('img[data-testid=diory-marker]').should('have.length', 1)
  } else {
    cy.get('img[data-testid=linked-diory-marker]').should('have.length', 0)
    cy.get('img[data-testid=diory-marker]').should('have.length', 0)
  }
})

Then('I see {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.get('div.leaflet-popup').should('have.length', 1)
  cy.contains(dioryName).should('have.length', 1)
})
