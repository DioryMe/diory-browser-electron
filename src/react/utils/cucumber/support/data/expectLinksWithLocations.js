export const expectLinksWithLocations = (idPrefix, id, links) => {
  const { diograph } = require(`./src/react/features/connector/mockResponses`)
  const diory = diograph[idPrefix + id]
  const locations = Object.values(diory.links).filter(({ id }) => diograph[id].latitude && diograph[id].longitude)
  expect(locations.length).toBe(links)
}
