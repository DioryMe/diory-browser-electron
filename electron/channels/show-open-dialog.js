const { dialog } = require('electron')

exports.showOpenDialog = () => {
  console.log('asdfasdf')
  return dialog.showOpenDialog({ properties: ['openDirectory'] })
}
