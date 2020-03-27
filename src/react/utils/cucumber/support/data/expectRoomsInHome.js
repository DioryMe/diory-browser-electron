export const expectRoomsInHome = rooms => {
  const home = require(`./src/react/features/connector/mockResponses/GET_HOME.json`)
  expect(Object.keys(home.rooms).length).toBe(rooms)
}
