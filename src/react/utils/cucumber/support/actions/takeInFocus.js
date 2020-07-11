export function takeInFocus(idPrefix, id) {
  this.app.update()
  this.app.find(`div#${idPrefix}${id}`).simulate('click')
}
