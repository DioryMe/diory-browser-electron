Feature: Timeline lens

  Background:
    Given I am at home
    When I take 'Kayaking at Potomac' in focus
    And I select timeline lens

  # NOTE:
  # 1. Timeline doesn't show marker for focus diory
  # - although it has a date and there's no diories in view
  # 2. Timeline shows a marker for each diory on view
  # - although not all of them have dates
  # 3. Currently timeline crashes if none of the diorys in view has dates

  Scenario: Shows marker for each diory on view (although not all of them have dates)
    Then I see 0 focus and 13 linked markers on timeline

  # FIXME: Should identify the marker to be clicked => now takes to Kayaking at Potomac just because it's the first diory in the view...
  Scenario: Shows popup when clicking marker and clicking popup takes diory in focus
    When I navigate backward
    And I see 0 focus and 3 linked markers on timeline
    And I click 'Kayaking at Potomac' marker
    And I see 'Kayaking at Potomac' in view
    And I click 'Kayaking at Potomac' popup on timeline
    Then I see 0 focus and 13 linked markers on timeline

  @pending
  Scenario: Selecting tool
    When I select tools button
    And I select add button
    Then add button is active

  @pending
  Scenario: Deselecting tool
    Given I select tools button
    And I select add button
    And I select active add button
    Then add button is not active

  @pending
  Scenario: Adding link to diory on timeline
    And diory 1 has 4 links
    When I select tools button
    And I select add button
    And I select location on timeline
    Then I see 5 diorys on timeline
    And diory is saved to diograph

  @pending
  Scenario: Moving diory on timeline
    When I select tools button
    And I select move button
    And I move diory on timeline
    Then I diorys is moved to location
    And diory location is saved to diograph

  @pending
  Scenario: Removing diory from timeline
    Given room 1 has 2 links
    When I select tools button
    And I select remove button
    And I select diory 1 marker
    And I select diory 1 popup
    Then diory 1 marker is not on timeline
    And room 1 has 1 linked diory
