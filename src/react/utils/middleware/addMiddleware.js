const addMiddleware =
  (middleware = []) =>
  // eslint-disable-next-line
  (state, action) =>
    middleware.reduce((st, fn) => fn(st, action), state)

export default addMiddleware
