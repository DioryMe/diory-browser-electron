export function expectDioryOnContainer(item, id, container) {
  expect(this.app.find(container).exists(`[data-testid="${item + id}"]`)).toBe(
    true
  )
}
