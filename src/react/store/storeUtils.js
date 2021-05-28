import { useCallback } from 'react'
import { debounce } from '../utils'
import { useDispatch } from './StoreContext'

export const createReducer = (handlers) => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  }
  return handlers[action.type](state, action)
}

const promiseActions = (dispatch) => (promise, action) => {
  const { type, payload } = action({})
  dispatch({ type: `${type}_BEGIN`, payload })
  return promise()
    .then((data) => {
      dispatch({ type: `${type}_SUCCESS`, payload: { ...payload, ...data } })
      return data
    })
    .catch((error) => dispatch({ type: `${type}_FAILURE`, payload: { error } }))
}

export const useDispatchActions = () => {
  const dispatch = useDispatch()
  return {
    dispatch,
    dispatchAction: (action) => (...params) => {
      dispatch(action(...params))
      return params
    },
    dispatchPromiseAction: promiseActions(dispatch),
    debounceDispatchPromiseAction: useCallback(
      // Use the same debounce function
      debounce(promiseActions(dispatch), 1000),
      []
    ),
  }
}

const defaultReducer = (state, { payload }) => ({
  ...state,
  ...payload,
})

export const promiseReducers = (
  actionType,
  triggerKey,
  progressKey,
  successKey,
  errorKey,
  reducer = defaultReducer
) => ({
  [`${actionType}_BEGIN`]: (state, { payload }) =>
    reducer(state, {
      payload: {
        ...payload,
        [triggerKey]: false,
        [progressKey]: true,
      },
    }),
  [`${actionType}_SUCCESS`]: (state, { payload }) =>
    reducer(state, {
      payload: {
        ...payload,
        [progressKey]: false,
        [successKey]: true,
        [errorKey]: false,
      },
    }),
  [`${actionType}_FAILURE`]: (state, { payload }) =>
    reducer(state, {
      payload: {
        ...payload,
        [progressKey]: false,
        [successKey]: false,
        [errorKey]: payload.error,
      },
    }),
})
