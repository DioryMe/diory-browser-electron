const HomeStore = require('electron-store')
const path = require('path')
const { channels } = require('../../src/shared/constants')

/**
 * Event handler for GET_HOME channel
 * @function
 * @param event {Object} - Event from frontend via ipcMain
 * @param params {Object} - No params
 * @return {Promise} Resolves with home object (keys: rooms, connections, focus)
 */
export const handleGetHomeEvent = (event, params) => {
  const store = new HomeStore()
  const home = store.get('home') || defaultHome

  return new Promise((resolve, reject) => {
    resolve({ channelName: channels.GET_HOME, responseObject: home })
  })
}

// Path to Welcome room folder
// - different in production build (.dmg/.exe) than in local build
export const defaultWelcomeRoomPath = process.env.BINARY_BUILD
  ? path.join(__dirname, '../../default-welcome-room')
  : './public/default-welcome-room'

// Welcome room home object
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
