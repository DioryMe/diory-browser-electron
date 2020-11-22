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

  # Latitude
  Scenario: Update latitude
    When I add '234' to latitude field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '234' in latitude field

  # Date
  Scenario: Update date
    When I add '2020-11-01' to date field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Diory 11' in focus
    Then I see '2020-11-01' in date field

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
  @pending
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
