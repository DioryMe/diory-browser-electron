const { ipcMain } = require('electron')
const { channels } = require('../../src/shared/constants')

const home = require('../../public/home.json');

ipcMain.on(channels.GET_HOME, (event) => {
  console.log('GET_HOME')
  console.log(home)
  console.log('--------')
  event.sender.send(channels.GET_HOME, home);
});
