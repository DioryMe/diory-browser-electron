Feature: Search

  Background:
    Given I am at home

  Scenario: Basic search
    When I type 'Diory 1' in search bar
    Then I see 'Diory 1' in view
    And I see 'Diory 11' in view
    And I see 'Diory 12' in view
    And I see 'Diory 13' in view
    And I see 'Diory 14' in view

  Scenario: AND / OR doesn't work (only consecutive characters)
    When I type 'Diory 2' in search bar
    Then I do not see 'Diory 12' in view

  Scenario: Minimum word length is one and search is case insensitive
    When I type 'f' in search bar
    Then I see 'Frenkell' in view

  Scenario: When clicked it sets diory in focus
    When I type 'dior' in search bar
    And I take 'Diory 14' in focus
    Then I do not see 'Diory 12' in view
