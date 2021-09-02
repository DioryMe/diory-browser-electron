export function resolveReverseDiograph(diograph) {
  if (!diograph) {
    return
  }

  const reverseDiograph = {}
  Object.entries(diograph).forEach(([dioryId, diory]) => {
    if (!diory.links) {
      return
    }

    Object.values(diory.links)
      .map(({ id }) => id)
      .filter((linkId) => diograph[linkId])
      .forEach((linkId) => {
        if (!reverseDiograph[linkId]) {
          reverseDiograph[linkId] = {
            id: linkId,
          }
        }

        reverseDiograph[linkId].links = {
          ...reverseDiograph[linkId].links,
          [dioryId]: {
            id: dioryId,
          },
        }
      })
  })

  return reverseDiograph
}
