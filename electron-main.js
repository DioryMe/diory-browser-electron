const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')
const url = require('url')
require('electron-reload')('./electron')

const { startIpfs } = require('./electron/connectors/ipfs/save-image-channel')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js'),
    },
  })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        // FIXME: Figure out how to allow local & binary use
        // package-* scripts want it this way...
        // pathname: path.join(__dirname, 'index.html'),
        pathname: path.join(__dirname, 'build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  )

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.env.DEV_TOOLS) {
    mainWindow.webContents.openDevTools()
  }

  startIpfs()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function loadChannels() {
  const files = glob.sync(path.join(__dirname, 'electron/channels/**/*.js'))
  files.forEach((file) => require(file))
  require('./electron/connectors/ipfs/save-image-channel.js')
}

console.log(`User data: ${app.getPath('userData')}/config.json`)

loadChannels()
