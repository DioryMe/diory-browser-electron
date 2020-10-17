Feature: Room

  Background:
    Given I am at home

  Scenario: Diory in focus
    When I take diory 1 in focus
    Then I see diory 1 in view
