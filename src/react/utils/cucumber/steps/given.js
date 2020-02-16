import { Given } from 'cucumber'

import { mountApp } from '../support/actions/mountApp'
import { expectRoomsInHome } from '../support/data/expectRoomsInHome'
import { expectLinksInDiory } from '../support/data/expectLinksInDiory'
import { expectLinksWithLocations } from '../support/data/expectLinksWithLocations'

Given('I am at home', mountApp)
Given('I have {int} room(s)', expectRoomsInHome)
Given('{word} {int} has {int} link(s)', expectLinksInDiory)
Given('{word} {int} has {int} link(s) with location', expectLinksWithLocations)
