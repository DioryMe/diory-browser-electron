import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I add {string} to {word} field', (inputFieldValue, inputFieldName) => {
  cy.get(`input#TextInputField-${inputFieldName}`).type(inputFieldValue, {
    parseSpecialCharSequences: false,
  })
})

When('I press {word} key', (keyName) => {
  cy.get('input#TextInputField-text').type(`{${keyName}}`)
})

When('I close dialog from X button', () => {
  cy.get('div[role=dialog] > div > button > svg[data-icon=cross]').click()
})

Then('I see {string} in {word} field', (text, inputFieldName) => {
  cy.get(`input#TextInputField-${inputFieldName}`).invoke('val').should('eq', text)
})
