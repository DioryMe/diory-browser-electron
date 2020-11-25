Feature: Creating content to Map lens

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus

  Scenario: Create diory to map
    When I select tools button
    And I select create button
    And I add 'Map diory' to text field
    And I add '62' to latitude field
    And I add '24' to longitude field
    And I click Done button
    And I take 'Map diory' in focus
    And I select map lens
    Then I see 1 marker on map
