import { useDispatch } from './StoreContext'

export const createReducer = (handlers) => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  }
  return handlers[action.type](state, action)
}

export const useDispatchAction = () => {
  const dispatch = useDispatch()
  return {
    dispatch,
    dispatchAction: (action) => (params) => {
      dispatch(action(params))
      return params
    },
  }
}

export const promiseDispatch = (dispatch, promise, action) => {
  const actionType = action({}).type
  dispatch({ type: `${actionType}_BEGIN` })
  promise()
    .then((data) => {
      dispatch(action(data))
      dispatch({ type: `${actionType}_SUCCESS` })
      return data
    })
    .catch((error) => dispatch({ type: `${actionType}_FAILURE`, payload: { error } }))
}

export const promiseReducers = (actionType, triggerKey, progressKey, successKey, errorKey) => ({
  [`${actionType}_BEGIN`]: (state) => ({
    ...state,
    [triggerKey]: false,
    [progressKey]: true,
  }),
  [`${actionType}_SUCCESS`]: (state) => ({
    ...state,
    [progressKey]: false,
    [successKey]: true,
    [errorKey]: false,
  }),
  [`${actionType}_FAILURE`]: (state, { payload }) => ({
    ...state,
    [progressKey]: false,
    [successKey]: false,
    [errorKey]: payload.error,
  }),
})
