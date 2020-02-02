export function selectModifierIdItem(modifier, id, item) {
  console.log(this.app.find('OperationsBar').debug())
  this.app.find(`[data-testid="${id}-${item}--${modifier}"]`).simulate('click')
}
