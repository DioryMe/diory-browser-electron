Feature: Update tool

  Background:
    Given I am at home
    And I select tools button
    And I select update button

   Scenario: Update tool shown
     Then update tool is active
     Then Update tool dialog is opened

#  @pending
#  Scenario: Update text
#    When I add some text to text field
#    Then I see some text in text field
#
#  @pending
#  Scenario: Update image
#    When I add some image to image field
#    Then I see some image in image field
#
#  @pending
#  Scenario: Update style
#    When I add style object to style field
#    Then I see style object in style field
#
#  @pending
#  Scenario: Invalid style
#    When I add invalid style to style field
#    Then I see invalid object notification in style field
#
#  @pending
#  Scenario: Update longitude
#    When I add 123 longitude to longitude field
#    Then I see 123 longitude in longitude field
#
#  @pending
#  Scenario: Update latitude
#    When I add 234 to latitude field
#    Then I see 234 in latitude field
#
#  @pending
#  Scenario: Update date
#    When I add some date to date field
#    Then I see some date in date field
#
#  @pending
#  Scenario: Update data
#    When I add data object to data field
#    Then I see data object in data field
#
#  @pending
#  Scenario: Invalid style
#    When I add invalid style to style field
#    Then I see invalid object notification in style field
#
#  @pending
#  Scenario: Update diory
#    Given I add some text to text field
#    When I click done button
#    Then update tool is closed
#    And I see some text in focus diory
#
#  @pending
#  Scenario: Cancel updateing from cancel button
#    Given I add some text to text field
#    When I click cancel button
#    Then update tool is closed
#    And I do not see some text in focus diory
#
#  @pending
#  Scenario: Cancel updateing from close button
#    Given I add some text to text field
#    When I click close button
#    Then update tool is closed
#    And I do not see some text in focus diory
#
#  @pending
#  Scenario: Cancel updateing by clicking outside
#    Given I add some text to text field
#    When I click outside the modal
#    Then update tool is closed
#    And I do not see some text in focus diory
