import { Then } from 'cucumber'

import expectToFindNumberOfRooms from '../support/expectToFindNumberOfRooms'
import expectToBeInRoom from '../support/expectToBeInRoom'

Then('I see {int} rooms', expectToFindNumberOfRooms)
Then('I am in room {int}', expectToBeInRoom)

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
