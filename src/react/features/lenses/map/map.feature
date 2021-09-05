Feature: Map lens

  # FIXME: Should identify the marker to be clicked => now takes to Keskustori just because it's the first diory in the view...

  Background:
    Given I am at home
    When I select and take 'Map content' in focus
    When I select and take 'Tampere' in focus
    And I select map lens

  Scenario: Markers on map
    Then I see 1 focus and 3 linked markers on map

  Scenario: Diory in focus popup on map
    Then I see 'Tampere' popup on map

  Scenario: Diory in focus persists when changing lenses
    When I select grid lens
    When I select and take 'Frenkell' in focus
    When I select map lens
    Then I see 'Frenkell' in view

  Scenario: Change popup on map
    When I click 'Keskustori' marker
    # FIXME: This should fail because the text is in popup, not in diory view...
    # - currently there's no elements to specify searching the text better
    Then I see 'Keskustori' in view
    And I see 'Keskustori' popup on map

  Scenario: Change diory in focus on map
    When I click 'Keskustori' marker
    And I click 'Keskustori' popup on map
    Then I see 'Keskustori' popup on map
    And I see 1 focus and 0 linked markers on map

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
    And I see 1 focus and 3 linked markers on map

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

  Scenario: Moving diory on map
    Given I navigate backward
    When I select tools button
    And I select move button
    And I drag marker on the map
    And I select grid lens
    And I select tools button
    And I select update button
    And I select and take 'Helvetinjärven kansallispuisto' in focus
    Then I do not see '62, 24' in latlng field

  @pending
  Scenario: Removing diory from map
    Given room 1 has 2 links
    When I select tools button
    And I select remove button
    And I select diory 1 marker
    And I select diory 1 popup
    Then diory 1 marker is not on map
    And room 1 has 1 linked diory

  Scenario: Map with diories without locations
    Given I select grid lens
    And I navigate backward
    And I navigate backward
    And I select and take 'Generic content' in focus
    And I select and take 'Diory 1' in focus
    When I select map lens
    Then I see 0 focus and 0 linked markers on map

