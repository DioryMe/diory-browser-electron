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
