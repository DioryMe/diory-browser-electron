import { useDispatch } from 'react-redux'

export const createReducer =
  (initialState, handlers) =>
  // eslint-disable-next-line default-param-last
  (state = initialState, action) => {
    if (!handlers.hasOwnProperty(action.type)) {
      return state
    }
    return handlers[action.type](state, action)
  }

export function createActions(actionType) {
  return {
    begin: (payload) => ({
      type: `${actionType}_BEGIN`,
      payload,
    }),
    success: (payload) => ({
      type: `${actionType}_SUCCESS`,
      payload,
    }),
    failure: (error) => ({
      type: `${actionType}_FAILURE`,
      payload: { error },
    }),
  }
}

export const useDispatchActions = () => {
  const dispatch = useDispatch()
  return {
    dispatch,
    dispatchAction:
      (action) =>
      (...params) => {
        dispatch(action(...params))
        return params
      },
  }
}

const defaultReducer = (state, { payload }) => ({
  ...state,
  ...payload,
})

export const promiseReducers = (
  actionType,
  progressKey,
  successKey,
  errorKey,
  reducer = defaultReducer
) => ({
  [`${actionType}_BEGIN`]: (state, { payload = {} }) =>
    reducer(
      {
        ...state,
        [progressKey]: true,
      },
      {
        payload,
      }
    ),
  [`${actionType}_SUCCESS`]: (state, { payload = {} }) =>
    reducer(
      {
        ...state,
        [progressKey]: false,
        [successKey]: true,
        [errorKey]: false,
      },
      {
        payload,
      }
    ),
  [`${actionType}_FAILURE`]: (state, { payload = {} }) =>
    reducer(
      {
        ...state,
        [progressKey]: false,
        [successKey]: false,
        [errorKey]: payload.error,
      },
      {
        payload,
      }
    ),
})
