Feature: Search

  Background:
    Given I am at home
    And I select search button

  Scenario: Search bar appears when search button is clicked
    Then I see search bar
    And I see search-close button

  Scenario: Add button appears when something is typed to search input
    When I type 'Mary' in search input
    Then I see add button

  Scenario: Search results and add button disappears when search input is cleared
    Given I type 'Mary' in search input
    And I see add button
    # TODO: And I see element with id 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    When I select search-close button
    Then I don't see add button
    And I don't see search-close button
    # TODO: And I don't see element with id 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    And I don't see search bar

  Scenario: Search a diory
    When I type 'Mary' in search input
    And I click element with id 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    # This next line passes although two rows above would be commented out
    Then I see 'Mary' in view
    And I don't see search bar

  Scenario: Update tool works on search result
    Given I take 'Generic content' in focus
    And I type 'Mary' in search input
    When I select tools button
    And I select update button
    And I take 'Mary' in focus
    Then update tool is active
    And I see 'Update diory' in view

  # TODO: Delete tool doesn't work with search results, should it?
  # Scenario: Delete tool works on search result
  #   Given I take 'Generic content' in focus
  #   And I type 'Mary' in search input
  #   When I select tools button
  #   And I select delete button
  #   And I take 'Mary' in focus
  #   And I click Delete button
  #   Then I do not see 'Mary' in view

  Scenario: Memory can be linked to search result
    Given I type 'Mary' in search input
    When I drag 'generic-content' to 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    And I click element with id 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105'
    Then I see 'Generic content' in view

  Scenario: Search result can be linked to memory
    Given I type 'Mary' in search input
    When I drag 'search-e07c2f1d-5f5a-488a-a505-34f7b9f55105' to 'generic-content'
    And I select search-close button
    And I click element with id 'generic-content'
    Then I see 'Mary' in view
