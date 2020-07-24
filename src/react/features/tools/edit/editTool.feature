Feature: Edit tool

  Background:
    Given I am at home
    And I select tools button
    And I select edit tool

  @pending
  Scenario: Edit tool shown
    Then I see edit tool in view

  @pending
  Scenario: Edit text
    When I add some text to text field
    Then I see some text in text field

  @pending
  Scenario: Edit image
    When I add some image to image field
    Then I see some image in image field

  @pending
  Scenario: Edit style
    When I add style object to style field
    Then I see style object in style field

  @pending
  Scenario: Invalid style
    When I add invalid style to style field
    Then I see invalid object notification in style field

  @pending
  Scenario: Edit longitude
    When I add 123 longitude to longitude field
    Then I see 123 longitude in longitude field

  @pending
  Scenario: Edit latitude
    When I add 234 to latitude field
    Then I see 234 in latitude field

  @pending
  Scenario: Edit date
    When I add some date to date field
    Then I see some date in date field

  @pending
  Scenario: Edit data
    When I add data object to data field
    Then I see data object in data field

  @pending
  Scenario: Invalid style
    When I add invalid style to style field
    Then I see invalid object notification in style field

  @pending
  Scenario: Update diory
    Given I add some text to text field
    When I click done button
    Then edit tool is closed
    And I see some text in focus diory

  @pending
  Scenario: Cancel editing from cancel button
    Given I add some text to text field
    When I click cancel button
    Then edit tool is closed
    And I do not see some text in focus diory

  @pending
  Scenario: Cancel editing from close button
    Given I add some text to text field
    When I click close button
    Then edit tool is closed
    And I do not see some text in focus diory

  @pending
  Scenario: Cancel editing by clicking outside
    Given I add some text to text field
    When I click outside the modal
    Then edit tool is closed
    And I do not see some text in focus diory