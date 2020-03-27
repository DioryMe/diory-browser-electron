export function expectDioryItemOnContainer(prefix, id, item, container) {
  expect(this.app.find(container).exists(`[data-testid="${prefix + id}-${item}"]`)).toBe(true)
}
