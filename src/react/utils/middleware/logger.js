export const initial = (state, action) => {
  console.log(`---${new Date().getSeconds()}.${new Date().getMilliseconds()}---`)
  console.log('PreviousState:', state)
  console.log('Action:', action)

  return state
}

export const final = (state) => {
  console.log('NextState:', state)
  return state
}
