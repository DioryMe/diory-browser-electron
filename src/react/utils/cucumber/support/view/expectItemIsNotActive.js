export function expectItemIsNotActive(id, item) {
  expect(this.app.find(`[data-testid="${id}-${item}--active"]`)).not.toBe(true)
}
