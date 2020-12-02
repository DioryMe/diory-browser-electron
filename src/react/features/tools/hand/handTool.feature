Feature: Hand tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  @pending
  Scenario: Hand tool shown
    Then hand tool is active
    Then I see hand tool

  @pending
  Scenario: Take diory into hand
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    When I drag 'Diory 11' into hand
    Then I see 'Diory 11' in hand

  @pending
  Scenario: Link diory from hand to view
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    And I drag 'Diory 11' into hand
    And I take 'Diory 12' in focus
    When I drag 'Diory 11' from hand to view
    Then I see 'Diory 11' in view

  @pending
  Scenario: Link diory from hand to linked diory
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    And I drag 'Diory 11' into hand
    When I drag 'Diory 11' from hand on 'Diory 12'
    And I take 'Diory 12' in focus
    Then I see 'Diory 11' in view

  @pending
  Scenario: Link linked diory to another linked diory
    Given  I see 'Diory 11' in view
    And  I see 'Diory 12' in view
    When I drag 'Diory 11' on 'Diory 12'
    And I take 'Diory 12' in focus
    Then I see 'Diory 11' in view