export function selectModifierIdItem(modifier, id, item) {
  console.log(this.app.find('ToolsBar').debug())
  this.app.find(`[data-testid="${id}-${item}--${modifier}"]`).simulate('click')
}
