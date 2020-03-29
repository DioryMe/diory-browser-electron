export const expectRoomsInHome = (rooms) => {
  const home = require('../../../../features/connector/mockResponses/GET_HOME.json')
  expect(Object.keys(home.rooms).length).toBe(rooms)
}
