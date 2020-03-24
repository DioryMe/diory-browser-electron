export function setIdAsKey(item) {
  return item.id && {
    [item.id]: item,
  }
}

export function isEmpty(obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}

function valuesToArrays([obj1, obj2], obj) {
  const [item1, item2] = Object.values(obj)
  return ([
    { ...obj1, ...item1 },
    { ...obj2, ...item2 },
  ])
}

export function reduceValuesToArraysPromise(asyncFunc) {
  return async (array) => {
    const promises = await Promise.all(array.map(asyncFunc))
    return promises.reduce(valuesToArrays, [{}, {}])
  }
}
