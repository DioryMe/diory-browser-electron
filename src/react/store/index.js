import reducers from './reducers'

const combineReducers = reducers => (state, action) =>
  Object.entries(reducers).reduce(
    (obj, [key, reducer]) => ({
      ...obj,
      [key]: reducer(state[key], action),
    }),
    {}
  )

export const reducer = combineReducers(reducers)

export { default as initialState } from './initialState'

export { StoreProvider, useStore, useDispatch } from './StoreContext'
export {
  useDispatchAction,
  usePromiseDispatch,
  createReducer,
  promiseReducers,
} from './storeUtils'
