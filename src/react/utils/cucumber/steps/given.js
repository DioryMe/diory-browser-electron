import { Given } from 'cucumber'

import expectNumberOfRooms from '../support/expectMockHomeNumberOfRooms'
import mountApp from '../support/mountApp'

Given('I have {int} rooms', expectNumberOfRooms)
Given('I am at home', mountApp)
