export default function selectRoom(number) {
  this.app.find('div#room' + number).simulate('click')
  this.app.update()
}
