import { When } from 'cucumber'

import mountApp from '../support/mountApp'
import selectRoom from '../support/selectRoom'

When('I go home', mountApp)
When('I enter room {int}', selectRoom)

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
