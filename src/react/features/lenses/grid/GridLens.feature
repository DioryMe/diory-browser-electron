Feature: ContentSourceGrid

  Scenario: Home
    Given I am at home
    Then I see 8 memories in view

  Scenario: Jane
    Given I am at home
    And I take 'Jane (person)' in focus
    Then I see 3 memories in view
