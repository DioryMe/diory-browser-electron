Feature: Delete tool

  Background:
    Given I am at home
    When I take 'Generic content' in focus
    And I take 'Diory 1' in focus
    And I select tools button

  Scenario: Delete tool is shown
    Then I see delete button
    And I see 'Diory 11' in view

  Scenario: Diory in focus and its links are deleted
    When I take 'Diory 14' in focus
    And I select delete button
    And I click 'Diory 14' focus diory
    And I click Delete button
    Then I do not see 'Diory 14' in view
    And I see 'Diory 11' in view
    And 'Diory 14' diory not in the store
    And 'link14' link not in the store

  Scenario: Link to diory in view is deleted (not the diory!)
    When I select delete button
    And I take 'Diory 11' in focus
    And I click Delete button
    Then I do not see 'Diory 11' in view
    And 'link11' link not in the store
    And 'Diory 11' diory is in the store

  Scenario: Link to self is deleted
    When I take 'Diory 11' in focus
    And I select delete button
    And I take 'Diory 11' in focus
    And I click Delete button
    # Diory 11 is in focus and 'Diory 11' is shown as heading
    # although link to 'Diory 11' is deleted from view
    Then I see 'Diory 11' in view
    And 'link11-to-self' link not in the store
    And 'link11' link is in the store
    And 'Diory 11' diory is in the store

  Scenario: Deleting diory is cancelled
    When I select delete button
    And I take 'Diory 11' in focus
    And I click Cancel button
    Then I see 'Diory 11' in view

  Scenario: Delete diory is deactivated
    When I select delete button
    And I select 'delete-button--active'
    Then I see tools button

  Scenario: Multiple diories are deleted from view
    When I select delete button
    And I take 'Diory 11' in focus
    And I click Delete button
    And I take 'Diory 12' in focus
    And I click Delete button
    Then I do not see 'Diory 11' in view
    And I do not see 'Diory 12' in view
    But I see 'Diory 14' in view



