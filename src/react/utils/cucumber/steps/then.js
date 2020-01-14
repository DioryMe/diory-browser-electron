import { Then } from 'cucumber'

import { expectRoomsInView } from '../support/view/expectRoomsInView'
import { expectDiorysInView } from '../support/view/expectDiorysInView'
import { expectInFocus } from '../support/view/expectInFocus'

Then('I see {int} room(s)', expectRoomsInView)
Then('I see {int} diory(s)', expectDiorysInView)
Then('I see {int} linked diory(s)', expectDiorysInView)
Then('I am in {word} {int}', expectInFocus)
Then('I see {word} {int} in view', expectInFocus)

Then('I see a new room', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('my rooms are in new order', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})

Then('I do not see the room', function() {
  // Write code here that turns the phrase above into concrete actions
  return 'pending'
})
