export function selectItem(arg1, arg2) {
  const testid = [arg1, arg2].join('-')
  this.app.update()
  this.app.find(`[data-testid="${testid}"]`).last().simulate('click')
  this.app.update()
}
