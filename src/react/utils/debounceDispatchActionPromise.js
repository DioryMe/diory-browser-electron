import { debounce } from './index'

export const debounceDispatchActionPromise = debounce((dispatch, actionType, func) => {
  dispatch({ type: actionType + '_BEGIN' })
  func()
    .then((data) => dispatch({ type: actionType + '_SUCCESS', payload: data }))
    .catch((error) => dispatch({ type: actionType + '_FAILURE', payload: { error } }))
}, 500)
