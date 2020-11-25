Feature: Creating content to Timeline lens

  Background:
    Given I am at home
    And I take 'Generic content' in focus
    And I take 'Diory 1' in focus

  Scenario: Create diory to timeline
    When I select tools button
    And I select create button
    And I add 'Timeline diory' to text field
    And I add '2020-11-23' to date field
    And I click Done button
    And I take 'Timeline diory' in focus
    And I select timeline lens
    Then I see 1 marker on timeline

  Scenario: Timeline with diories without dates
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select timeline lens
    Then I see 0 markers on timeline
