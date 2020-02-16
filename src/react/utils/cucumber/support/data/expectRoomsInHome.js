export const expectRoomsInHome = rooms => {
  const home = require(`../../../../lib/mockResponses/GET_HOME`)
  expect(Object.keys(home.rooms).length).toBe(rooms)
}
