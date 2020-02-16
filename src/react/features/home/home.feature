Feature: Home

  Background:
    Given I am at home

  Scenario: Rooms at home
    Given I have 2 rooms
    Then I see 2 rooms

  Scenario: Entering a room
    When I enter room 1
    Then I am in room 1

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
