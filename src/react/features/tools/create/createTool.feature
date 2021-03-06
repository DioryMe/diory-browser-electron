Feature: Create tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I take 'Diory 11' in focus
    And I select tools button
    And I select create button

  Scenario: Create tool shown
    Then create tool is active
    Then I see 'Create diory' in view

  # Done & cancel
  Scenario: Done saves changes and closes the dialog
    When I add 'Some diory' to text field
    And I click Done button
    Then I do not see 'Create diory' in view
    And I see 'Some diory' in view

  Scenario: Cancel cancels changes and closes the dialog
    When I add 'Some diory' to text field
    And I click Cancel button
    Then I do not see 'Create diory' in view
    And I do not see 'Some diory' in view

  # Text
  Scenario: Create text
    When I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see 'Some diory' in text field

  # Image
  Scenario: Create image
    When I add '/test-image.png' to image field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '/test-image.png' in image field

  # TODO: Checking background-image is dioryId dependent
  #       and as we don't know the created diory dioryId this is not possible
  # Scenario: Create image changes background image
  #   When I add '/test-image.png' to image field
  #   And I click Done button
  #   Then 'diory11' has 'url("http://localhost:3300/test-image.png")' as  'background-image'

  # Style
  Scenario: Create style
    When I add '{"some":"object"}' to style field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '{"some":"object"}' in style field

  Scenario: Invalid style
    When I add 'not an object' to style field
    Then I see 'Invalid object' in view

  # Longitude
  Scenario: Create longitude
    When I add '123' to longitude field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '123' in longitude field

  # Latitude
  Scenario: Create latitude
    When I add '234' to latitude field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '234' in latitude field

  # Date
  Scenario: Create date
    When I add '2020-11-01' to date field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '2020-11-01' in date field

  # Data
  Scenario: Create data
    When I add '{"some":"object"}' to data field
    And I add 'Some diory' to text field
    And I click Done button
    And I select tools button
    And I select update button
    And I take 'Some diory' in focus
    Then I see '{"some":"object"}' in data field

  Scenario: Invalid style
    When I add 'not an object' to data field
    Then I see 'Invalid object' in view

  # Enter key
  Scenario: Save updating by pressing enter-key
    Given I add 'Some diory' to text field
    When I press enter key
    Then I do not see 'Create diory' in view
    And I see 'Some diory' in view

  # Esc key
  Scenario: Cancel updating by pressing esc-key
    Given I add 'Some diory' to text field
    When I press esc key
    Then I do not see 'Create diory' in view
    And I do not see 'Some diory' in view

  # Close X button
  Scenario: Cancel updating from close button
    Given I add 'Some diory' to text field
    When I close dialog from X button
    Then I do not see 'Create diory' in view
    And I do not see 'Some diory' in view

  # Clicking outside
  Scenario: Clicking outside does nothing
    Given I add 'Some diory' to text field
    When I click outside the dialog
    Then I see 'Create diory' in view
    And I see 'Some diory' in text field
