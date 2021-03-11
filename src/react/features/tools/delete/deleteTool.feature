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
    # FIXME: Pending for confirmation dialog
    # And I click Delete button
    Then I do not see 'Diory 14' in view
    And I see 'Diory 11' in view
    And 'diory14' diory not in the store
    # FIXME: Doesn't delete reverse links yet (although it should)
    # And 'link14' link not in the store
    # FIXME: This is just to verify the step definition
    And 'link11' link is in the store

  Scenario: Link to diory in view is deleted (not the diory!)
    When I select delete button
    And I take 'Diory 11' in focus
    # FIXME: Pending for confirmation dialog
    # And I click Delete button
    Then I do not see 'Diory 11' in view
    And 'link11' link not in the store
    And 'diory11' diory is in the store

  # FIXME: Pending for confirmation dialog
  # Scenario: Deleting diory is cancelled
  #   When I select delete button
  #   And I take 'Diory 11' in focus
  #   And I click Cancel button
  #   Then I see 'Diory 11' in view

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



