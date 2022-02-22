Feature: Content

  Rule: Show and control content in background

  Background:
    Given I am at home
    And I take 'Generic content' in focus

  Scenario: Play and pause video
    When I take 'some-video.mov' in focus
    Then I see pause button
    But I do not see play button
    When I select pause button
    Then I do not see video playing
    And I see play button
    When I select play button
    Then I see video playing

  Scenario: Unmute and mute video
    When I take 'some-video.mov' in focus
    Then I see unmute button
    But I do not see mute button
    When I select unmute button
    Then I hear video sound
    And I see mute button
    When I select mute button
    Then I do not hear video sound
    When I navigated backward
    Then I do not see unmute button
    And I do not see mute button

  Scenario: Open video in folder
    When I take 'some-video.mov' in focus
    Then I see folder button
    When I select folder button
    Then I see 'some-video.mov' file in folder
    When I navigated backward
    Then I do not see folder button

  Scenario: Play and pause audio
    When I take 'A beautiful sonate' in focus
    Then I see play button
    But I do not see pause button
    When I select play button
    Then I see audio playing
    And I see pause button
    When I select pause button
    Then I do not see audio playing
    When I navigated backward
    Then I do not see play button
    And I do not see pause button

  Scenario: Open audio in folder
    When I take 'A beautiful sonate' in focus
    Then I see folder button
    When I select folder button
    Then I see 'A beautiful sonate' file in folder
    When I navigated backward
    Then I do not see folder button

  Scenario: Open image in folder
    When I take 'some-image' in focus
    Then I see folder button
    When I select folder button
    Then I see 'Diory 1' file in folder
    When I navigated backward
    Then I do not see folder button

  Scenario: Scroll document pages
    When I take 'some-document.pdf' in focus
    Then I see document page 1
    And I see next button
    But I do not see previous button
    When I select next button
    Then I see document page 2
    And I see next button
    And I see previous button
    When I select next button
    Then I see document page 3
    And I see previous button
    But I do not see next button
    When I select previous button
    Then I see document page 2
    When I navigated backward
    Then I do not see next button
    And I do not see previous button

    Scenario: Open document in folder
    When I take 'some-document.pdf' in focus
    Then I see folder button
    When I select folder button
    Then I see 'some-document.pdf' file in folder
    When I navigated backward
    Then I do not see folder button