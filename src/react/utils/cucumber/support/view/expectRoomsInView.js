export function expectRoomsInView(amount) {
  this.app.update()
  expect(this.app.find('Room')).toHaveLength(amount)
}
