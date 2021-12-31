Feature: Search

  Background:
    Given I am at home
    And I select search button

  Scenario: Search bar appears when search button is clicked
    Then I see search bar

  Scenario: Add button appears when something is typed to search bar
    When I type 'Mary' in search input
    Then I see add button

  Scenario: Search a diory
    When I type 'Mary' in search input
    And I click element with id 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    # This next line passes although two rows above would be commented out
    Then I see 'Mary' in view
    And I don't see search bar
