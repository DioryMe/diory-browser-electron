import { When } from 'cucumber'

import { mountApp } from '../support/actions/mountApp'
import { selectRoom } from '../support/actions/selectRoom'
import { takeInFocus } from '../support/actions/takeInFocus'

When('I go home', mountApp)
When('I enter room {int}', selectRoom)
When('I take {word} {int} in focus', takeInFocus)

When('I select tools', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('I select the {word} tool', function(tool) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

When('I select a folder', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
