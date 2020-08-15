const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.GET_HOME, (event) => {
  console.log('GET_HOME')

  const store = new HomeStore()
  const defaultHome = {
    rooms: {},
    connections: {
      '/Users/op/2020/diory/IPFS': {
        room: '11909355-48ed-475b-86a9-a47dbd15c492',
        connector: 'file',
      },
      '/ipns/QmPZ7TqWkERJVTNiY7TmLhigv2Ye4CdnSxzE4DDgcVJeqJ': {
        room: '11909355-48ed-475b-86a9-a47dbd15c492',
        connector: 'ipfs',
      },
    },
    focus: {
      roomId: '11909355-48ed-475b-86a9-a47dbd15c492',
      dioryId: '11909355-48ed-475b-86a9-a47dbd15c492',
    },
  }
  const home = store.get('home') || defaultHome

  console.log(home)

  event.sender.send(channels.GET_HOME, home)
})
