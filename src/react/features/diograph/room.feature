Feature: Room

  Background:
    Given I am at home

  Scenario: Diory in focus
    When I take 'Diory 1' in focus
    Then I see 'Diory 12' diory
