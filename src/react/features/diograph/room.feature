Feature: Room

  Background:
    Given I am at home
    And I take 'Generic content' in focus

  Scenario: Diory in focus
    When I take 'Diory 1' in focus
    Then I see 'Diory 12' in view
