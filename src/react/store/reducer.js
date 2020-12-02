import buttons from '../features/buttons/reducers'
import connectors from '../features/connectors/reducers'
import filters from '../features/filters/reducers'
import tools from '../features/tools/reducers'
import rooms from '../features/rooms/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
import diograph from '../features/diograph/reducers'

const combineReducers = (reducers) => (state, action) =>
  Object.entries(reducers).reduce(
    (obj, [key, reducer]) => ({
      ...obj,
      [key]: reducer(state[key], action),
    }),
    {}
  )

export const reducer = combineReducers({
  buttons,
  connectors,
  filters,
  tools,
  rooms,
  lenses,
  navigation,
  diograph,
})
