import focusReducer, { initialState as navigation } from './navigation'
import lensesReducer, { initialState as lenses } from './lenses'
import homeReducer, { initialState as home } from './home'
import diographReducer, { initialState as diograph } from './diograph'

export const initialState = {
  navigation,
  home,
  lenses,
  diograph,
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
  diograph: diographReducer,
})
