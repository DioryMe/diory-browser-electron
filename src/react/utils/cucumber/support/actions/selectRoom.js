export function selectRoom(number) {
  this.app.update()
  this.app.find('div#room' + number).simulate('click')
}
