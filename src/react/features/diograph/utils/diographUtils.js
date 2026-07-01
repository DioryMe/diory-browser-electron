export const getPath = (key) => key && key.split('/').slice(0, -1).join('/')

export const addDioryId = (key, diograph) => {
  if (!key || !diograph[key]) return null

  if (key.endsWith('/')) {
    const rootKey = `${diograph[key].id}`
    return diograph[rootKey] ? rootKey : key
  }

  return key
}

export const getDiographKey = (dioryKey, id) => `${getPath(dioryKey)}/${id}`

export const resolveDiographKey = (dioryKey, linkId) => {
  const dioryPath = getPath(dioryKey)

  // const keyParts = linkId.split('/')
  // if (keyParts.length === 1 && dioryPath) {
  //   return `${dioryPath}/${linkId}`
  // }

  if (linkId.startsWith('/')) {
    return `${dioryPath}${linkId}`
  }

  return linkId
}

export const getDiographAddress = (dioryKey, linkId) => {
  const linkDioryKey = resolveDiographKey(dioryKey, linkId)
  const linkDioryPath = getPath(linkDioryKey)
  return `${linkDioryPath}/`
}

export const mapDiographToDiories = (diograph) =>
  Object.entries(diograph).map(([key, diory]) => ({ key, ...diory }))
