Feature: Create tool

  Background:
    Given I am at home
    And I select tools button
    And I select create button

#  @pending
#  Scenario: Create tool shown
#    Then create tool is active
#
#  @pending
#  Scenario: Create text
#    When I create some text to text field
#    Then I see some text in text field
#
#  @pending
#  Scenario: Create image
#    When I create some image to image field
#    Then I see some image in image field
#
#  @pending
#  Scenario: Create style
#    When I create style object to style field
#    Then I see style object in style field
#
#  @pending
#  Scenario: Invalid style
#    When I create invalid style to style field
#    Then I see invalid object notification in style field
#
#  @pending
#  Scenario: Create longitude
#    When I create 123 longitude to longitude field
#    Then I see 123 longitude in longitude field
#
#  @pending
#  Scenario: Create latitude
#    When I create 234 to latitude field
#    Then I see 234 in latitude field
#
#  @pending
#  Scenario: Create date
#    When I create some date to date field
#    Then I see some date in date field
#
#  @pending
#  Scenario: Create data
#    When I create data object to data field
#    Then I see data object in data field
#
#  @pending
#  Scenario: Invalid style
#    When I create invalid style to style field
#    Then I see invalid object notification in style field
#
#  @pending
#  Scenario: Update diory
#    Given I create some text to text field
#    When I click done button
#    Then create tool is closed
#    And I see some text in focus diory
#
#  @pending
#  Scenario: Cancel createing from cancel button
#    Given I create some text to text field
#    When I click cancel button
#    Then create tool is closed
#    And I do not see some text in focus diory
#
#  @pending
#  Scenario: Cancel createing from close button
#    Given I create some text to text field
#    When I click close button
#    Then create tool is closed
#    And I do not see some text in focus diory
#
#  @pending
#  Scenario: Cancel createing by clicking outside
#    Given I create some text to text field
#    When I click outside the modal
#    Then create tool is closed
#    And I do not see some text in focus diory