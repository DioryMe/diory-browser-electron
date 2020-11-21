Feature: Delete tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  Scenario: Delete tool is shown
    Then I see delete button
    And I see 'Diory 11' in view

  Scenario: Diory is deleted from view
    When I select delete button
    And I take 'Diory 11' in focus
    # And I click Yes button
    Then I do not see 'Diory 11' in view

  # Scenario: Diory is deleted from search
    # When I select delete button
    # And I take 'Diory 11' in focus
    # And I click Yes button
    # And I type 'Diory 11' in search bar
    # Then I do not see 'Diory 11' in view

  # Scenario: Deleting diory is cancelled
    # When I select delete button
    # And I take 'Diory 11' in focus
    # And I click No button
    # Then I see 'Diory 11' in view

  Scenario: Delete diory is deactivated
    When I select delete button
    And I select 'delete-button--active'
    Then I see tools button



