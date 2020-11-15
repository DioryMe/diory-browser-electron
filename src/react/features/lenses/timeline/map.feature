Feature: Map lens

  Background:
    Given I am at home
    And I select map lens

  @pending
  Scenario: Diory markers on map
    Given room 1 has 2 links with location
    Then I see 2 markers on Map

  @pending
  Scenario: Diory popup on map
    When I select diory 1
    Then I see 1 popup on map

  @pending
  Scenario: Diory in focus
    When I select diory 1 marker on map
    And I select diory 1 popup on map
    Then I see diory 1 on map

  @pending
  Scenario: Linked diory markers on map
    Given I select diory 1 marker
    And I select diory 1 popup
    And diory 1 has 4 links
    Then I see 4 markers on map

  @pending
  Scenario: Selecting tool
    When I select tools button
    And I select add button
    Then add button is active

  @pending
  Scenario: Deselecting tool
    Given I select tools button
    And I select add button
    And I select active add button
    Then add button is not active

  @pending
  Scenario: Adding link to diory on map
    And diory 1 has 4 links
    When I select tools button
    And I select add button
    And I select location on map
    Then I see 5 diorys on map
    And diory is saved to diograph

  @pending
  Scenario: Moving diory on map
    When I select tools button
    And I select move button
    And I move diory on map
    Then I diorys is moved to location
    And diory location is saved to diograph

  @pending
  Scenario: Removing diory from map
    Given room 1 has 2 links
    When I select tools button
    And I select remove button
    And I select diory 1 marker
    Then diory 1 marker is not on map
    And room 1 has 1 linked diory
