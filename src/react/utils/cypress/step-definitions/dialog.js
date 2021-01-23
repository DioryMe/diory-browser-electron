import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I add {string} to {word} field', (inputFieldValue, inputFieldName) => {
  cy.get(`input#${inputFieldName}`).type(inputFieldValue, {
    parseSpecialCharSequences: false,
  })
})

When('I press {word} key', (keyName) => {
  cy.get('input#text').type(`{${keyName}}`)
})

When('I close dialog from X button', () => {
  cy.get('div[role=dialog] > div > button > div > svg[data-icon=cross]').click()
})

When('I click outside the dialog', () => {
  cy.get('div[evergreen-portal-container] > div > div').click(10, 10)
  cy.wait(200)
})

Then('I see {string} in {word} field', (text, inputFieldName) => {
  cy.get(`input#${inputFieldName}`).invoke('val').should('eq', text)
})

Then('I do not see {string} in {word} field', (text, inputFieldName) => {
  cy.get(`input#${inputFieldName}`).invoke('val').should('not.eq', text)
})
