export const initial = (state, action) => {
  console.log('-------------')
  console.log('PreviousState:')
  console.log(state)
  console.log('Action:')
  console.log(action)

  return state
}

export const final = (state) => {
  console.log('NextState:')
  console.log(state)
  return state
}
