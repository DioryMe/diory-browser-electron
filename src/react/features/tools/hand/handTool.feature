Feature: Hand tool

  Background:
    Given I am at home
    And I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  Scenario: Hand tool shown
    Then I see 'hand'

  Scenario: Add diory to hand when it is set in focus
    Then 'Generic content' diory is in the hand
    And 'Diory 1' diory is in the hand

  Scenario: Add diory to hand when it is created
    When I select create button
    And I add 'Some diory' to text field
    And I click Done button
    Then 'Some diory' diory is in the hand

  Scenario: Clicking diory in hand sets it in focus
    When I click 'generic-content' diory in hand
    Then I see 'Generic content' in view

  Scenario: Take diory into hand from view
    Given  I see 'Diory 11' in view
    When I drag 'diory11' into hand
    Then 'Diory 11' diory is in the hand

  Scenario: Take focus diory into hand
    Given  I take 'Diory 11' in focus
    When I drag 'Diory 11' into hand
    Then 'Diory 11' diory is in the hand

  Scenario: Link diory from hand to view (=focus diory)
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    And I drag 'diory11' into hand
    And I take 'Diory 12' in focus
    When I drag 'hand-diory11' to 'diory12'
    Then I see 'Diory 11' in view

  Scenario: Link diory from hand to linked diory
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    And I drag 'diory11' into hand
    When I drag 'hand-diory11' to 'diory12'
    And I take 'Diory 12' in focus
    Then I see 'Diory 11' in view

  Scenario: Link linked diory to another linked diory
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    When I drag 'diory11' to 'diory12'
    And I take 'Diory 12' in focus
    Then I see 'Diory 11' in view
