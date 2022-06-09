function getDiory(diograph = {}, dioryId) {
  return diograph[dioryId]
}

function getLinkedDiories(diograph = {}, dioryId) {
  const diory = diograph[dioryId] || {}
  if (!diory.links) {
    return []
  }

  return Object.values(diory.links)
    .map(({ id }) => ({ ...diograph[id] }))
    .filter(({ id }) => id)
}

export function getDiories(diograph, dioryId) {
  return [getDiory(diograph, dioryId), ...getLinkedDiories(diograph, dioryId)]
}
