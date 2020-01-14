export function expectDiorysInView(amount) {
  expect(this.app.find('Diory')).toHaveLength(amount)
}
