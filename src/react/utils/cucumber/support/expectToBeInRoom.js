export default function(number) {
  this.app.update()
  expect(this.app.exists('div#room' + number)).toBe(true)
}
