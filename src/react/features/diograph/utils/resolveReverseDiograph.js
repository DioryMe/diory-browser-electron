function removeLinks(diograph) {
  return Object.entries(diograph).reduce(
    (diographWithoutLinks, [dioryId, { links, ...diory }]) => ({
      ...diographWithoutLinks,
      [dioryId]: diory,
    }),
    {}
  )
}

export function resolveReverseDiograph(diograph) {
  const reverseDiograph = removeLinks(diograph)

  Object.entries(diograph).forEach(([dioryId, diory]) => {
    if (!diory.links) {
      return
    }

    Object.values(diory.links)
      .map(({ id }) => id)
      .filter((linkId) => diograph[linkId])
      .forEach((linkId) => {
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
