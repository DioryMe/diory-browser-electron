import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I click {string} marker', (dioryName) => {
  // FIXME: This doesn't use dioryName at all
  cy.get('img[data-testid=linked-diory-marker]').first().click({ force: true })
})

When('I drag marker on the map', () => {
  cy.get('img[data-testid=linked-diory-marker]').should('have.length', 1)
  cy.get('img[data-testid=linked-diory-marker]')
    .trigger('mousedown', { which: 1, force: true })
    .trigger('mousemove', 600, 600, { force: true })
    .trigger('mouseup')
})

When('I click {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.contains(dioryName).click()
})

Then(
  'I see {int} focus and {int} linked marker(s) on map/timeline',
  (focusMarkers, linkedMarkers) => {
    cy.get('img[data-testid=linked-diory-marker]').should('have.length', linkedMarkers)
    cy.get('img[data-testid=diory-marker]').should('have.length', focusMarkers)
  }
)

Then('I see {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.get('div.leaflet-popup').should('have.length', 1)
  cy.contains(dioryName).should('have.length', 1)
})
