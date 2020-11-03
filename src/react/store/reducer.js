import buttons from '../features/buttons/reducers'
import connectors from '../features/connectors/reducers'
import filters from '../features/filters/reducers'
import home from '../features/home/reducers'
import lenses from '../features/lenses/reducers'
import navigation from '../features/navigation/reducers'
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
  connectors,
  filters,
  home,
  lenses,
  navigation,
  room,
})
