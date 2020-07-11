export function expectInFocus(idPrefix, id) {
  this.app.update()
  expect(this.app.exists(`div#${idPrefix}${id}`)).toBe(true)
}
