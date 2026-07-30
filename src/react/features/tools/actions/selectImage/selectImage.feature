Feature: Select image tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  Scenario: Select image button shown with its icon
    Then I see select-image button
    And I see media icon in select-image button