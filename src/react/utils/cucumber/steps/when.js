import { When } from 'cucumber'

import { mountApp } from '../support/actions/mountApp'
import { navigateBackward } from '../support/actions/navigateBackward'
import { navigateForward } from '../support/actions/navigateForward'
import { navigateHome } from '../support/actions/navigateHome'
import { navigateLeft } from '../support/actions/navigateLeft'
import { navigateRight } from '../support/actions/navigateRight'
import { selectRoom } from '../support/actions/selectRoom'
import { selectItem } from '../support/actions/selectItem'
import { selectIdItem } from '../support/actions/selectIdItem'
import { selectModifierIdItem } from '../support/actions/selectModifierIdItem'
import { takeInFocus } from '../support/actions/takeInFocus'

When('I go home', mountApp)
When('I enter room {int}', selectRoom)
When('I take {word} {int} in focus', takeInFocus)

When('I navigate(d) backward', navigateBackward)
When('I navigate(d) forward', navigateForward)
When('I navigate(d) to home', navigateHome)
When('I navigate(d) to right', navigateRight)
When('I navigate(d) to left', navigateLeft)

When('I select {word} {word}', selectItem)
When('I select {word} {int} {word} on {word}', selectIdItem)
When('I select {word} {word} {word}', selectModifierIdItem)

When('I move diory on map', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('I select tools', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
