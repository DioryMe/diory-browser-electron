Feature: Navigation

  Background:
    Given I am at home
    And I enter room 1
    And I take diory 1 in focus

  Scenario: Navigate backward
    When I navigate backward
    Then I am in room 1

  Scenario: Navigate forward
    And I navigated backward
    When I navigate forward
    Then I see diory 1 in view

  Scenario: Navigate to left
    Given I take diory 13 in focus
    When I navigate to left
    Then I see diory 12 in view

  Scenario: Navigate to left end
    Given I take diory 12 in focus
    When I navigate to left
    Then I see diory 11 in view
    And I do not see navigate to left button

  Scenario: Navigate to right
    Given I take diory 12 in focus
    When I navigate to right
    Then I see diory 13 in view

  Scenario: Navigate to right end
    Given I take diory 13 in focus
    When I navigate to right
    Then I see diory 14 in view
    And I do not see navigate to right button

  Scenario: Navigate to home
    Given diory 1 has 4 links
    When I navigate to home
    Then I am at home

