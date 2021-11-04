import buttons from '../features/buttons/reducers'
import connectors from '../features/connectors/reducers'
import filters from '../features/filters/reducers'
import tools from '../features/tools/reducers'
import rooms from '../features/rooms/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
import diograph from '../features/diograph/reducers'
import search from '../features/search/reducers'
import { initialState } from './initialState'

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
  connectors,
  filters,
  tools,
  rooms,
  lenses,
  navigation,
  diograph,
  search,
})

export const RESET_STORE = 'RESET_STORE'

export const resetStore = () => ({
  type: RESET_STORE,
})

export const reducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return appReducer(initialState, action)
  }
  return appReducer(state, action)
}
