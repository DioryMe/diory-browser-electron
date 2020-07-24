Feature: Edit tool

  Background:
    Given I am at home
    And I select tools button
    And I select edit tool

  @pending
  Scenario: Edit tool shown
    Then I see edit tool in view

  @pending
  Scenario: Text field changed
    When I add some text to text field
    Then I see some text in text field

  @pending
  Scenario: Text updated
    Given I add some text to text field
    When I click done button
    Then edit tool is closed
    And I see some text in focus diory

  @pending
  Scenario: Cancel editing
    Given I add some text to text field
    When I click cancel button
    Then edit tool is closed
    And I do not see some text in focus diory

  @pending
  Scenario: Close editing
    Given I add some text to text field
    When I click close button
    Then edit tool is closed
    And I do not see some text in focus diory

  @pending
  Scenario: Click outside
    Given I add some text to text field
    When I click close button
    Then edit tool is closed
    And I do not see some text in focus diory