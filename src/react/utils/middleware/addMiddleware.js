const addMiddleware = (middleware = []) => (state, action) => {
  return middleware.reduce((st, fn) => fn(st, action), state)
}

export default addMiddleware
