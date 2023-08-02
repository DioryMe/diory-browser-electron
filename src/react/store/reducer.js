import { combineReducers } from 'redux'

import { RESET_STORE } from './actionsTypes'

import home from '../features/home/homeReducer'
import buttons from '../features/buttons/buttonsReducer'
import content from '../features/content/contentReducer'
import diograph from '../features/diograph/diographReducer'
import lenses from '../features/lenses/lensesReducer'
import navigation from '../features/navigation/navigationReducer'
import search from '../features/lenses/search/searchReducer'
import sideBar from '../features/sideBar/sideBarReducer'
import room from '../features/room/roomReducer'
import tools from '../features/tools/toolsReducer'
import doors from '../features/doors/doorsReducer'

const appReducer = combineReducers({
  home,
  buttons,
  content,
  diograph,
  lenses,
  navigation,
  search,
  sideBar,
  room,
  tools,
  doors,
})

export const reducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer({}, action)
  }
  return appReducer(state, action)
}
