Feature: Creating content to Map lens

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus

  Scenario: Map with diories without locations
    And I select map lens
    Then I see 0 focus and 0 linked markers on map

  Scenario: createTool created diory appears on map (in view)
    When I select tools button
    And I select create button
    And I add 'Map diory' to text field
    And I add '62' to latitude field
    And I add '24' to longitude field
    And I click Done button
    And I select map lens
    Then I see 0 focus and 1 linked marker on map

  Scenario: createTool created diory to map (in focus)
    When I select tools button
    And I select create button
    And I add 'Map diory' to text field
    And I add '62' to latitude field
    And I add '24' to longitude field
    And I click Done button
    And I take 'Map diory' in focus
    And I select map lens
    Then I see 1 focus and 0 linked markers on map

