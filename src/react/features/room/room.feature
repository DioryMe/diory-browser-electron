Feature: Room

  Background:
    Given I am at home
    When I enter room 1
    Then I am in room 1

  Scenario: Diorys in room
    Given room 1 has 2 linked diorys
    Then I see 2 diorys

  Scenario: Diory in focus
    When I take diory 1 in focus
    Then I see diory 1 in view

  Scenario: Linked diorys
    Given diory 1 has 4 links
    When I take diory 1 in focus
    Then I see 4 linked diorys

  @pending
  Scenario: Adding a room
    Given I select tools
    And I select the add tool
    And I select a folder
    Then I see a new room

  @pending
  Scenario: Moving a room
    When I select tools
    And I select the move tool
    Then my rooms are in new order

  @pending
  Scenario: Removing a room
    When I select tools
    And I select the remove tool
    Then I do not see the room
