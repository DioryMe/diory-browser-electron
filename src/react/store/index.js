import reducers from '../features/reducers'
import combineReducers from './combineReducers'

export const reducer = combineReducers(reducers)

export { default as initialState } from '../features/initialState'

export { StoreProvider, useStore, useDispatch } from './StoreContext'
