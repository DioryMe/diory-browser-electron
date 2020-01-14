export function expectRoomsInView(amount) {
  expect(this.app.find('Room')).toHaveLength(amount)
}
