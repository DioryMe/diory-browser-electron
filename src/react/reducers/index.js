import focusReducer, { initialState as focus } from './focus'
import lensesReducer, { initialState as lenses } from './lenses'
import diographReducer, { initialState as diograph } from './diograph'

export const initialState = {
  focus,
  lenses,
  diograph,
}

const combineReducers = (reducers) => (state, action) =>
  Object.entries(reducers).reduce((obj, [key, reducer]) => ({
    ...obj,
    [key]: reducer(state[key], action)
  }), {})

export default combineReducers({
  focus: focusReducer,
  lenses: lensesReducer,
  diograph: diographReducer,
})
