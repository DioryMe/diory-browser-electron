Feature: Room

  Background:
    Given I am at home

  Scenario: Diory in focus
    When I take diory 1 in focus
    Then I see diory 1 in view

  Scenario: Linked diorys
    Given I don't see 'Diory 12' diory
    When I take diory 1 in focus
    Then I see 'Diory 12' diory

  @pending
  Scenario: Adding a diory
    Given I select tools button
    And I select add tool
    And I select a folder
    Then I see a new diory

  @pending
  Scenario: Moving a diory
    When I select tools button
    And I select the move tool
    Then my diorys are in new order

  @pending
  Scenario: Removing a diory
    When I select tools button
    And I select the remove tool
    Then I do not see the diory
