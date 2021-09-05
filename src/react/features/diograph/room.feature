Feature: Room

  Background:
    Given I am at home

  Scenario: Diory in focus
    When I select and take 'Generic content' in focus
    And I select and take 'Diory 1' in focus
    Then I see 'Diory 12' in view

  @pending
  Scenario: Update tool is disabled
    When I select tools button
    Then I do not see update button

  @pending
  Scenario: Navigation is disabled
    And I do not see navigate to left button
    And I do not see navigate to right button
