import { Given, Then } from 'cucumber'
import { expectDiorysInView } from '../support/view/expectDiorysInView'
import { expectDioryOnContainer } from '../support/view/expectDioryOnContainer'
import { expectDioryItemOnContainer } from '../support/view/expectDioryItemOnContainer'
import { expectAmountOfItemsOnContainer } from '../support/view/expectAmountOfItemsOnContainer'
import { expectInFocus } from '../support/view/expectInFocus'
import { expectItemIsActive } from '../support/view/expectItemIsActive'
import { expectItemIsNotActive } from '../support/view/expectItemIsNotActive'
import { expectNotInView } from '../support/view/expectNotInView'

Then('I see {int} diory(s)', expectDiorysInView)
Then('I see {int} linked diory(s)', expectDiorysInView)
Then('I am in {word} {int}', expectInFocus)
Then('I see {word} {int} in view', expectInFocus)
Then('I do not see {word} to {word} button', expectNotInView)

Then('I see {int} {word} on {word}', expectAmountOfItemsOnContainer)
Then('I see {word} {int} on {word}', expectDioryOnContainer)
Then('I see {word} {int} {word} on {word}', expectDioryItemOnContainer)

Then('{word} {word} is active', expectItemIsActive)
Then('{word} {word} is not active', expectItemIsNotActive)

Then(
  'I see a new {word}',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'my {word} are in new order',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'I do not see the {word}',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'diory location is saved to diograph',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'room {int} has {int} linked diory',
  (int, int2) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  '{word} is saved to diograph',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'I diorys is moved to location',
  () =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'diory {int} marker is not on map',
  (int) =>
    // Write code here that turns the phrase above into concrete actions
    'pending'
)

Then(
  'I see {int} rooms',
  (int) =>
    // Then('I see {float} rooms', function (float) {
    // Write code here that turns the phrase above into concrete actions
    'pending'
)
