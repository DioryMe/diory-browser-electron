export function selectIdItem(prefix, id, item) {
  this.app.find(`[data-testid="${prefix + id}-${item}"]`).simulate('click')
}
