Feature: Navigation

  Background:
    Given I am at home
    And I select and take 'Generic content' in focus
    And I select and take 'Diory 1' in focus

  Scenario: Navigate backward
    When I navigate backward
    Then I am at home

  Scenario: Navigate forward
    And I navigate backward
    When I navigate forward
    Then I see 'Diory 1' in view

  Scenario: Navigate to left
    Given I select 'Diory 13' diory
    When I click fullscreen icon
    When I navigate to left
    Then I see 'Diory 12' in view

  Scenario: Navigate to left end
    Given I select 'Diory 12' diory
    When I click fullscreen icon
    When I navigate to left
    Then I see 'Diory 11' in view
    And I do not see navigate to left button

  Scenario: Navigate to right
    Given I select 'Diory 12' diory
    When I click fullscreen icon
    When I navigate to right
    Then I see 'Diory 13' in view

  Scenario: Navigate to right end
    Given I select 'Diory 13' diory
    When I click fullscreen icon
    When I navigate to right
    Then I see 'Diory 14' in view
    And I do not see navigate to right button

  Scenario: Navigate to home
    When I navigate to home
    Then I am at home

  Scenario: Focus
    Then focusId is 'diory1'

  Scenario: Selected
    Then selectedDioryId is 'null'

