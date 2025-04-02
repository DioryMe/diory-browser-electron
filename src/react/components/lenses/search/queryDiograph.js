function allKeysExist(queryDiory) {
  return ([, diory]) => !Object.keys(queryDiory).some((prop) => !diory[prop])
}

function allMatchToQuery(queryDiory) {
  return ([, diory]) =>
    !Object.entries(queryDiory).some(
      ([prop, query]) => !diory[prop].toLowerCase().includes(query.toLowerCase())
    )
}

function reduceToDioriesObject(dioriesObject, [key, diory]) {
  return {
    ...dioriesObject,
    [key]: diory,
  }
}

export function queryDiograph(queryDiory, diories) {
  return Object.entries(diories)
    .filter(allKeysExist(queryDiory))
    .filter(allMatchToQuery(queryDiory))
    .reduce(reduceToDioriesObject, {})
}
