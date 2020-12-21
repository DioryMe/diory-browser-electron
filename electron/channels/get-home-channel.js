const HomeStore = require('electron-store')
const path = require('path')
// const { channels } = require('../../src/shared/constants')

export const handleGetHomeEvent = (event, params) => {
  const store = new HomeStore()
  const home = store.get('home') || defaultHome

  // event.reply(channels.GET_HOME, home)
  event.reply(home)
}

export const defaultWelcomeRoomPath = process.env.BINARY_BUILD
  ? path.join(__dirname, '../../default-welcome-room')
  : './public/default-welcome-room'

export const defaultHome = {
  rooms: {
    'welcome-room': {
      id: 'welcome-room',
      text: 'Welcome room!',
    },
  },
  connections: {
    [defaultWelcomeRoomPath]: {
      room: 'welcome-room',
      connector: 'file',
    },
  },
  focus: {
    roomId: 'welcome-room',
    dioryId: 'welcome-room',
  },
}
