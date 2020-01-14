import { Given } from 'cucumber'

import { mountApp } from '../support/actions/mountApp'
import { expectRoomsInHome } from '../support/data/expectRoomsInHome'
import { expectLinksInDiory } from '../support/data/expectLinksInDiory'

Given('I am at home', mountApp)
Given('I have {int} rooms', expectRoomsInHome)
Given('{word} {int} has {int} linked diorys', expectLinksInDiory)
Given('{word} {int} has {int} links', expectLinksInDiory)
