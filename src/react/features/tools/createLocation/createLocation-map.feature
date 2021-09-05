Feature: Create location tool on map

  Background:
    Given I am at home
    And I select and take 'Map content' in focus
    And I select map lens
    And I select tools button
    And I select create button
    And I see 0 focus and 2 linked markers on map

  Scenario: createLocationTool created diory appears on map
    When I click bottom on the map
    Then I see 0 focus and 3 linked markers on map
