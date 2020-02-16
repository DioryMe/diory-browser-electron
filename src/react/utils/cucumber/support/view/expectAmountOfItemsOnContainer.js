export function expectAmountOfItemsOnContainer(amount, item, container) {
  this.app.update()
  console.log(this.app.find(container).debug())
  expect(this.app.find(container).find(item)).toHaveLength(amount)
}
