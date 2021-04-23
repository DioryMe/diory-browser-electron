const HomeStore = require('electron-store')
const path = require('path')
const fs = require('fs')

exports.getHomeEventHandler = async function getHomeEventHandler(event, params) {
  const store = new HomeStore({
    cwd: process.env.TESTCAFE_TEST ? `${process.env.PWD}/tmp/${Date.now()}` : undefined,
  })
  const home = store.get('home') || defaultHome

  home.errors = []
  Object.keys(home.connections).forEach((connectionURI) => {
    const roomConnectionOK = exports.roomConnectionOK(
      connectionURI,
      home.connections[connectionURI]
    )
    if (!roomConnectionOK) {
      home.errors.push({ connectionURI })
    }
  })

  return home
}

/*
 * Returns true if roomConnection is ok and false if not
 */
exports.roomConnectionOK = function roomConnectionOK(connectionURI, connectionConfig) {
  return fs.existsSync(connectionURI)
}

// Path to Welcome room folder
// - different in production build (.dmg/.exe) than in local build
const defaultWelcomeRoomPath = process.env.BINARY_BUILD
  ? path.join(__dirname, '../../default-welcome-room')
  : './public/default-welcome-room'

// Welcome room home object
const defaultHome = {
  rooms: {
    'welcome-room-id': {
      id: 'welcome-root-diory',
      text: 'Welcome room!',
    },
  },
  connections: {
    [defaultWelcomeRoomPath]: {
      room: 'welcome-room-id',
      connector: 'file',
    },
  },
  focus: {
    roomId: 'welcome-room-id',
    dioryId: 'welcome-root-diory',
  },
}
exports.defaultHome = defaultHome
