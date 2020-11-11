import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I add {string} to {word} field', (inputFieldValue, inputFieldName) => {
  cy.get(`input#TextInputField-${inputFieldName}`).type(inputFieldValue, {
    parseSpecialCharSequences: false,
  })
})

Then('I see {string} in {word} field', (text, inputFieldName) => {
  cy.get(`input#TextInputField-${inputFieldName}`).invoke('val').should('eq', text)
})
