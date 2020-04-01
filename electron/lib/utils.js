exports.isEmpty = function isEmpty(obj) {
  return typeof obj === 'object' && Object.keys(obj).length === 0
}

function valuesToArrays([obj1, obj2], obj) {
  const [item1, item2] = Object.values(obj)
  return [
    { ...obj1, ...item1 },
    { ...obj2, ...item2 },
  ]
}

exports.reduceValuesToArraysPromise = function reduceValuesToArraysPromise(asyncFunc) {
  return async array => {
    const promises = await Promise.all(array.map(asyncFunc))
    return promises.reduce(valuesToArrays, [{}, {}])
  }
}

exports.asyncReduce = function asyncReduce(asyncFunc) {
  return async array => {
    const promises = await Promise.all(array.map(asyncFunc))
    return promises.reduce(
      ([obj1, obj2], [item1, item2]) => [
        { ...obj1, ...item1 },
        { ...obj2, ...item2 },
      ],
      [{}, {}]
    )
  }
}

exports.removeUndefined = function removeUndefined(props) {
  return Object.keys(props)
    .filter(key => props[key])
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: props[key],
      }),
      {}
    )
}
