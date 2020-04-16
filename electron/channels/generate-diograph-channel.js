const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')
const { generateDiograph } = require('../generators/diograph-generator')

ipcMain.on(channels.GENERATE_DIOGRAPH, (event, path) => {
  console.log('GENERATE_DIOGRAPH', path)
  generateDiograph(path)
    .then(({ id, diograph }) => {
      console.log(id, diograph)
      console.log('--------')
      event.reply(channels.GENERATE_DIOGRAPH, { id, diograph })
    })
    .catch((err) => {
      console.log(err)
      return event.sender.send(channels.GENERATE_DIOGRAPH, null, err)
    })
})
