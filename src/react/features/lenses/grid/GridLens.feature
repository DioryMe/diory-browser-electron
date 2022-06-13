Feature: ContentSourceGrid

  Scenario: Home
    Given I am at home
    Then I see 7 memories in view

  Scenario: Jane
    Given I am at home
    And I take 'Jane' in focus
    Then I see 3 memories in view

  Scenario: Back
    Given I am at home
    And I take 'Jane' in focus
    And I click '---- GO BACK ----' button
    Then I see 7 memories in view
