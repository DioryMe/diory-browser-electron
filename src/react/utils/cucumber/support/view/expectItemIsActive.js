export function expectItemIsActive(id, item) {
  expect(this.app.exists(`[data-testid="${id}-${item}--active"]`)).toBe(true)
}
