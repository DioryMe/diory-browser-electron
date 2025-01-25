export const addStoreId = (store) => (next) => (action) => {
  console.log(action.storeId !== undefined)
  if (action.storeId !== undefined) return next(action)

  const { storeId } = store.getState().home
  return next({ ...action, storeId })
}

export const logger = (store) => (next) => (action) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}

export const errorReporter = () => (next) => (action) => {
  try {
    return next(action)
  } catch (err) {
    console.error('Error:', err)
    throw err
  }
}
