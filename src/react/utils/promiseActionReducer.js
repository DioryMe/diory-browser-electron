export function promiseActionReducer(actionType, progressKey, successKey, failureKey) {
  return {
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
    [actionType + '_FAILURE']: state => ({
      ...state,
      [progressKey]: false,
      [successKey]: false,
      [failureKey]: true,
    }),
  }
}
