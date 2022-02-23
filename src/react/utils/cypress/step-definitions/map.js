import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I click {string} marker', (dioryName) => {
  // FIXME: This doesn't use dioryName at all
  cy.get('img[data-testid=linked-diory-marker]').first().click({ force: true })
})

When('I drag marker on the map', () => {
  // FIXME: Should identify the marker to be clicked
  // => now requires to have only one marker
  cy.get('img[data-testid=linked-diory-marker]').should('have.length', 2)
  cy.get('img[data-testid=linked-diory-marker]').first().move({ deltaX: 200, deltaY: 200 })
})

When('I click {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.contains(dioryName).click()
})

When('I click {word} on the map', (position) => {
  cy.get('div#mapId').click({ position })
})

When('I click {word} on the timeline', (position) => {
  cy.get('div#timelineId').click({ position })
})

Then(
  'I see {int} focus and {int} linked marker(s) on map/timeline',
  (focusMarkers, linkedMarkers) => {
    cy.get('img[data-testid=diory-marker]').should('have.length', focusMarkers)
    cy.get('img[data-testid=linked-diory-marker]').should('have.length', linkedMarkers)
  }
)

Then('I see {string} popup on map/timeline', (dioryName) => {
  // FIXME: This doesn't require having the dioryName inside the popup
  cy.get('div.leaflet-popup').should('have.length', 1)
  cy.contains(dioryName).should('have.length', 1)
})
