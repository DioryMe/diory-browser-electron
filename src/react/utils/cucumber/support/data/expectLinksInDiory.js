export const expectLinksInDiory = (idPrefix, id, links) => {
  const { diograph } = require(`./src/react/features/connector/mockResponses`)
  const diory = diograph[idPrefix + id]
  expect(Object.keys(diory.links).length).toBe(links)
}
