const { ipcMain } = require('electron')
const HomeStore = require('electron-store')
const { channels } = require('../../src/shared/constants')

ipcMain.on(channels.GET_HOME, (event) => {
  console.log('GET_HOME')

  const defaultHome = {
    rooms: {
      '198d65b7-98fe-4e02-b6ab-4ad0964cda08': {
        id: '198d65b7-98fe-4e02-b6ab-4ad0964cda08',
        root: '7b8904ce-940e-46a4-b422-6af901317d91',
      },
    },
    connections: {
      '/Users/op/2020/diory/IPFS': {
        room: '198d65b7-98fe-4e02-b6ab-4ad0964cda08',
        connector: 'file',
        connect: true,
      },
      '/ipns/QmPZ7TqWkERJVTNiY7TmLhigv2Ye4CdnSxzE4DDgcVJeqJ': {
        room: '198d65b7-98fe-4e02-b6ab-4ad0964cda08',
        connector: 'ipfs',
      },
    },
    focus: {
      roomId: '198d65b7-98fe-4e02-b6ab-4ad0964cda08',
    },
  }

  const store = new HomeStore()
  const home = store.get('home') || defaultHome

  event.reply(channels.GET_HOME, defaultHome)
})
