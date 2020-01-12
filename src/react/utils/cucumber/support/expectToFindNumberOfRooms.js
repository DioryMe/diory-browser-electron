export default function(rooms) {
  expect(this.app.find('Room')).toHaveLength(rooms)
}
