import focusReducer, { initialState as navigation } from '../features/navigation/reducers'
import lensesReducer, { initialState as lenses } from '../features/lenses/reducers'
import homeReducer, { initialState as home } from '../features/home/reducers'
import roomReducer, { initialState as room } from '../features/room/reducers'

export const initialState = {
  navigation,
  home,
  lenses,
  room,
}

const combineReducers = (reducers) => (state, action) =>
  Object.entries(reducers).reduce((obj, [key, reducer]) => ({
    ...obj,
    [key]: reducer(state[key], action)
  }), {})

export default combineReducers({
  navigation: focusReducer,
  lenses: lensesReducer,
  home: homeReducer,
  room: roomReducer,
})
