Feature: Navigation

  Background:
    Given I am at home
    And I take 'Generic content' in focus
    And I take 'Diory 1' in focus

  Scenario: Navigate backward
    When I navigate backward
    Then I am at home

  Scenario: Navigate forward
    And I navigated backward
    When I navigate forward
    Then I see 'Diory 1' in view

  Scenario: Navigate to left
    Given I take 'Diory 13' in focus
    When I navigate to left
    Then I see 'Diory 12' in view

  Scenario: Navigate to left end
    Given I take 'Diory 12' in focus
    When I navigate to left
    Then I see 'Diory 11' in view
    And I do not see navigate to left button

  Scenario: Navigate to right
    Given I take 'Diory 12' in focus
    When I navigate to right
    Then I see 'Diory 13' in view

  Scenario: Navigate to right end
    Given I take 'Diory 13' in focus
    When I navigate to right
    Then I see 'Diory 14' in view
    And I do not see navigate to right button

  Scenario: Navigate to home
    When I navigate to home
    Then I am at home

