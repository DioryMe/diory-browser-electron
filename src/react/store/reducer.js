import { combineReducers } from 'redux'

import { RESET_STORE } from './actionsTypes'

import buttons from '../features/buttons/buttonsReducer'
import tools from '../features/tools/toolsReducer'
import lenses from '../features/lenses/lensesReducer'
import navigation from '../features/navigation/navigationReducer'
import diograph from '../features/diograph/diographReducer'
import search from '../features/search/searchReducer'
import settings from '../features/settings/settingsReducer'

const appReducer = combineReducers({
  buttons,
  tools,
  lenses,
  navigation,
  diograph,
  search,
  settings,
})

export const reducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer({}, action)
  }
  return appReducer(state, action)
}
