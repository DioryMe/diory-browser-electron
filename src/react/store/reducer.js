import connector from '../features/connector/reducers'
import home from '../features/home/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
import tools from '../features/tools/reducers'
import room from '../features/room/reducers'

const combineReducers = reducers => (state, action) =>
  Object.entries(reducers).reduce(
    (obj, [key, reducer]) => ({
      ...obj,
      [key]: reducer(state[key], action),
    }),
    {}
  )

export const reducer = combineReducers({
  connector,
  home,
  lenses,
  navigation,
  tools,
  room,
})
