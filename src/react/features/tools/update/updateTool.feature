Feature: Update tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus

  Scenario: Update tool shown
    Then update tool is active
    And I see 'Update diory' in view

  Scenario: Update tool opens for diory in focus
    Then I click Cancel button
    And I select tools button
    And I select update button
    And I click 'Diory 1' focus diory
    And I add ' focus diory' to text field
    And I click Done button
    Then I do not see 'Update diory' in view
    And I see 'Diory 1 focus diory' in view

  # Done & cancel
  Scenario: Done saves changes and closes the dialog
    When I add ' some text' to text field
    And I click Done button
    Then I do not see 'Update diory' in view
    And I see 'Diory 11 some text' in view

  Scenario: Cancel cancels changes and closes the dialog
    When I add ' some text' to text field
    And I click Cancel button
    Then I do not see 'Update diory' in view
    And I do not see 'Diory 11 some text' in view
    And I see 'Diory 11' in view

  # Text
  Scenario: Update text
    # FIXME: Don't know how to select all & replace the text
    When I add ' some text' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see 'Diory 11 some text' in text field

  # Image
  Scenario: Update image
    When I add '/test-image.png' to image field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '/test-image.png' in image field

  Scenario: Update image changes background image
    When I add '/test-image.png' to image field
    And I click Done button
    Then 'diory11' has 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("http://localhost:3300/test-image.png")' as 'background-image'

  # Style
  Scenario: Update style
    When I add '{"some":"object"}' to style field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '{"some":"object"}' in style field

  Scenario: Invalid style
    When I add 'not an object' to style field
    Then I see 'Invalid object' in view

  # Longitude
  Scenario: Update longitude
    When I add '123' to longitude field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '123' in longitude field

  Scenario: Invalid number
    When I add 'asdfasdf' to longitude field
    Then I see 'Invalid number' in view

  # Latitude
  Scenario: Update latitude
    When I add '234' to latitude field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '234' in latitude field

  Scenario: Invalid number
    When I add '12.12.12' to latitude field
    Then I see 'Invalid number' in view

  # Date
  Scenario: Update date
    When I add '2020-11-01' to date field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '2020-11-01' in date field

  Scenario: Invalid date
    When I add '29.2.2021' to date field
    Then I see 'Invalid object' in view

  # Data
  Scenario: Update data
    When I add '{"some":"object"}' to data field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '{"some":"object"}' in data field

  Scenario: Invalid style
    When I add 'not an object' to data field
    Then I see 'Invalid object' in view

  # Enter key
  Scenario: Save updating by pressing enter-key
    Given I add ' some text' to text field
    When I press enter key
    Then I do not see 'Update diory' in view
    And I see 'Diory 11 some text' in view

  # Esc key
  Scenario: Cancel updating by pressing esc-key
    Given I add ' some text' to text field
    When I press esc key
    Then I do not see 'Update diory' in view
    And I do not see 'some text' in view

  # Close X button
  Scenario: Cancel updating from close button
    Given I add ' some text' to text field
    When I close dialog from X button
    Then I do not see 'Update diory' in view
    And I do not see 'some text' in view

  # Clicking outside
  Scenario: Clicking outside does nothing
    Given I add ' some text' to text field
    When I click outside the dialog
    Then I see 'Update diory' in view
    And I see 'Diory 11 some text' in text field
