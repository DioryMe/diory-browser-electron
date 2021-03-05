Feature: Delete tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  Scenario: Delete tool is shown
    Then I see delete button
    And I see 'Diory 11' in view

  Scenario: Diory in focus is deleted
    When I take 'Diory 14' in focus
    And I select delete button
    And I click 'Diory 14' focus diory
    And I click Delete button
    Then I do not see 'Diory 14' in view
    And I see 'Diory 11' in view

  Scenario: Diory is deleted from view
    When I select delete button
    And I take 'Diory 11' in focus
    And I click Delete button
    Then I do not see 'Diory 11' in view

  Scenario: Deleting diory is cancelled
    When I select delete button
    And I take 'Diory 11' in focus
    And I click Cancel button
    Then I see 'Diory 11' in view

  # Scenario: Diory is deleted from search
    # When I select delete button
    # And I take 'Diory 11' in focus
    # And I click Yes button
    # And I type 'Diory 11' in search bar
    # Then I do not see 'Diory 11' in view

  Scenario: Delete diory is deactivated
    When I select delete button
    And I select 'delete-button--active'
    Then I see tools button



