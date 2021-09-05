Feature: Create location tool on timeline

  Background:
    Given I am at home
    And I select and take 'Kayaking at Potomac' in focus
    And I select timeline lens
    And I select tools button
    And I select create button
    And I see 0 focus and 11 linked markers on map

  Scenario: createLocationTool created diory appears on timeline
    When I click bottom on the timeline
    Then I see 0 focus and 12 linked markers on map
