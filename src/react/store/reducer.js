import buttons from '../features/buttons/reducers'
import connector from '../features/connector/reducers'
import filters from '../features/filters/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
import tools from '../features/tools/reducers'
import room from '../features/room/reducers'

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
  connector,
  filters,
  lenses,
  navigation,
  tools,
  room,
})
