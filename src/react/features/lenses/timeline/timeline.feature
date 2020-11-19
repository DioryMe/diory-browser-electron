Feature: Timeline lens

  Background:
    Given I am at home
    And I select timeline lens

  @pending
  Scenario: Diory markers on timeline
    Given room 1 has 2 links with location
    Then I see 2 markers on Timeline

  @pending
  Scenario: Diory popup on timeline
    When I select diory 1
    Then I see 1 popup on timeline

  @pending
  Scenario: Linked diory markers on timeline
    Given I select diory 1 marker
    And I select diory 1 popup
    And diory 1 has 4 links
    Then I see 4 markers on timeline

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
  Scenario: Adding link to diory on timeline
    And diory 1 has 4 links
    When I select tools button
    And I select add button
    And I select location on timeline
    Then I see 5 diorys on timeline
    And diory is saved to diograph

  @pending
  Scenario: Moving diory on timeline
    When I select tools button
    And I select move button
    And I move diory on timeline
    Then I diorys is moved to location
    And diory location is saved to diograph

  @pending
  Scenario: Removing diory from timeline
    Given room 1 has 2 links
    When I select tools button
    And I select remove button
    And I select diory 1 marker
    And I select diory 1 popup
    Then diory 1 marker is not on timeline
    And room 1 has 1 linked diory
