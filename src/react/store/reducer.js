import { combineReducers } from 'redux'

import { RESET_STORE } from './actionsTypes'

import buttons from '../features/buttons/buttonsReducer'
import content from '../features/content/contentReducer'
import diograph from '../features/diograph/diographReducer'
import lenses from '../features/lenses/lensesReducer'
import navigation from '../features/navigation/navigationReducer'
import search from '../features/search/searchReducer'
import room from '../features/room/roomReducer'
import tools from '../features/tools/toolsReducer'

const appReducer = combineReducers({
  buttons,
  content,
  diograph,
  lenses,
  navigation,
  search,
  room,
  tools,
})

export const reducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer({}, action)
  }
  return appReducer(state, action)
}
