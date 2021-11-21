import { RESET_STORE } from './actionsTypes'

import { initialState } from './initialState'

import buttons from '../features/buttons/reducers'
import tools from '../features/tools/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
import diograph from '../features/diograph/reducers'
import search from '../features/search/reducers'
import settings from '../features/settings/reducers'

const combineReducers = (reducers) => (state, action) =>
  Object.entries(reducers).reduce(
    (obj, [key, reducer]) => ({
      ...obj,
      [key]: reducer(state[key], action),
    }),
    {}
  )

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
    return appReducer(initialState, action)
  }
  return appReducer(state, action)
}
