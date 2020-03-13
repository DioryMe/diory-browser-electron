import reducers from './reducers'
import combineReducers from './combineReducers'

export const reducer = combineReducers(reducers)

export { default as initialState } from './initialState'

export { StoreProvider, useStore, useDispatch } from './StoreContext'
