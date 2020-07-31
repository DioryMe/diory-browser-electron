export const expectLinksInDiory = (idPrefix, id, links) => {
  const {
    diograph,
  } = require('../../../../features/connectors/folder/client/mockResponses/GET_ROOM.json')
  const diory = diograph[idPrefix + id]
  expect(Object.keys(diory.links).length).toBe(links)
}
