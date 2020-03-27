import { useCallback } from 'react'
import { useDispatch } from './StoreContext'

export const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  }
  return handlers[action.type](state, action)
}

export const useDispatchAction = action => {
  const dispatch = useDispatch()
  return useCallback(params => dispatch(action(params)), [action, dispatch])
}

export const usePromiseDispatch = () => {
  const dispatch = useDispatch()
  return (action, connect) => {
    const actionType = action({}).type
    dispatch({ type: actionType + '_BEGIN' })
    connect()
      .then(data => {
        dispatch(action(data))
        dispatch({ type: actionType + '_SUCCESS' })
      })
      .catch(error => dispatch({ type: actionType + '_FAILURE', payload: { error } }))
  }
}

export const promiseReducers = (actionType, progressKey, successKey, failureKey) => ({
  [actionType + '_BEGIN']: state => ({
    ...state,
    [progressKey]: true,
  }),
  [actionType + '_SUCCESS']: state => ({
    ...state,
    [progressKey]: false,
    [successKey]: true,
    [failureKey]: false,
  }),
  [actionType + '_FAILURE']: (state, { payload }) => ({
    ...state,
    error: payload.error,
    [progressKey]: false,
    [successKey]: false,
    [failureKey]: true,
  }),
})
