import { Given } from 'cucumber'

import { mountApp } from '../support/actions/mountApp'
import { expectLinksInDiory } from '../support/data/expectLinksInDiory'
import { expectLinksWithLocations } from '../support/data/expectLinksWithLocations'

Given('I am at home', mountApp)
Given('{word} {int} has {int} link(s)', expectLinksInDiory)
Given('{word} {int} has {int} link(s) with location', expectLinksWithLocations)

Given(
  'I have {int} rooms',
  (int) =>
    // Given('I have {float} rooms', function (float) {
    // Write code here that turns the phrase above into concrete actions
    'pending'
)
