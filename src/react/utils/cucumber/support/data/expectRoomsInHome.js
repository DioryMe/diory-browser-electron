export const expectRoomsInHome = rooms => {
  const home = require(`./src/react/features/connector/mockResponses`)
  expect(Object.keys(home.rooms).length).toBe(rooms)
}
