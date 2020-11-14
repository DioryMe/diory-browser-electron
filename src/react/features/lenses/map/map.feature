Feature: Map lens

  Background:
    Given I am at home
    When I take 'Tampere' in focus
    And I select map lens

  Scenario: Markers on map
    Then I see 4 markers on map

  Scenario: Diory in focus popup on map
    Then I see 'Tampere' popup on map

  Scenario: Diory in focus persists when changing lenses
    When I select grid lens
    When I take 'Frenkell' in focus
    When I select map lens
    Then I see 'Frenkell' in view

  Scenario: Change popup on map
    When I click 'Keskustori' marker
    # FIXME: This should fail because the text is in popup, not in diory view...
    # - currently there's no elements to specify searching the text better
    Then I see 'Keskustori' in view
    Then I see 'Keskustori' popup on map

  Scenario: Change diory in focus on map
    When I click 'Keskustori' marker
    And I click 'Keskustori' popup on map
    Then I see 'Keskustori' popup on map
    And I see 1 marker on map

  Scenario: Changing focus changes focus also on grid
    When I click 'Keskustori' marker
    And I click 'Keskustori' popup on map
    And I select grid lens
    Then I see 'Keskustori' in view

  Scenario: Back button on map
    When I click 'Keskustori' marker
    And I click 'Keskustori' popup on map
    And I navigate backward
    Then I see 'Tampere' popup on map
    And I see 4 markers on map

  Scenario: Forward button on map
    When I click 'Keskustori' marker
    And I click 'Keskustori' popup on map
    And I navigate backward
    And I navigate forward
    Then I see 'Keskustori' popup on map

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
  Scenario: Adding link to diory on map
    And diory 1 has 4 links
    When I select tools button
    And I select add button
    And I select location on map
    Then I see 5 diorys on map
    And diory is saved to diograph

  @pending
  Scenario: Moving diory on map
    When I select tools button
    And I select move button
    And I move diory on map
    Then I diorys is moved to location
    And diory location is saved to diograph

  @pending
  Scenario: Removing diory from map
    Given room 1 has 2 links
    When I select tools button
    And I select remove button
    And I select diory 1 marker
    And I select diory 1 popup
    Then diory 1 marker is not on map
    And room 1 has 1 linked diory
