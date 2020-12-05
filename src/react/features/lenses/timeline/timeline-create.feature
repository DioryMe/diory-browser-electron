Feature: Creating content to Timeline lens

  Background:
    Given I am at home
    And I take 'Generic content' in focus
    And I take 'Diory 1' in focus

  @pending
  # Crashes to an error
  Scenario: Timeline with diories without dates
    And I select timeline lens
    Then I see 0 focus and 0 linked markers on timeline

  @pending
  # Shows 5 markers although other diories in view don't have dates
  Scenario: Create diory to timeline (on view)
    When I select tools button
    And I select create button
    And I add 'Timeline diory' to text field
    And I add '2020-11-23' to date field
    And I click Done button
    And I select timeline lens
    Then I see 0 focus and 1 linked marker on timeline

  @pending
  # Doesn't show anything on timeline
  Scenario: Create diory to timeline (in focus)
    When I select tools button
    And I select create button
    And I add 'Timeline diory' to text field
    And I add '2020-11-23' to date field
    And I click Done button
    And I take 'Timeline diory' in focus
    And I select timeline lens
    Then I see 1 focus and 0 linked markers on timeline
