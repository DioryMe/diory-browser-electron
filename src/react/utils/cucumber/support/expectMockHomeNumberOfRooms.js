export default function(rooms) {
  const home = require(`../../../lib/mockResponses/GET_HOME.json`)
  expect(Object.keys(home.rooms).length).toBe(rooms)
}
