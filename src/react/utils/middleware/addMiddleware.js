const addMiddleware =
  (middleware = []) =>
  (state, action) =>
    middleware.reduce((st, fn) => fn(st, action), state)

export default addMiddleware
