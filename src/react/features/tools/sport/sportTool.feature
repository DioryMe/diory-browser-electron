Feature: Sport tool

  @pending
  Background:
    Given I am in room

  @pending
  Scenario: Generate Sport summary diorys
    When I select tools button
    And I select sport button
    Then sport diorys are created to diograph

  @pending
  Scenario: See Sport diorys
    When I take 'timeline' in focus
    And I take '2021' in focus
    Then I see '2021 Sports summary' in view
