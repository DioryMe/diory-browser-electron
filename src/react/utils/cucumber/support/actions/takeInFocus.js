export function takeInFocus(idPrefix, id) {
  console.log('div#' + idPrefix + id)
  console.log(this.app.debug())
  this.app.find('div#' + idPrefix + id).simulate('click')
  this.app.update()
}
