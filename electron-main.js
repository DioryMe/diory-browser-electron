const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
require('electron-reload')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js'),
      contextIsolation: true,
    },
  })

  const indexHtmlPath = process.env.BINARY_BUILD ? 'index.html' : 'build/index.html'

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, indexHtmlPath),
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

const Store = require('electron-store')
Store.initRenderer()

// Set event handlers for IPC channels
// require('./electron/channels/channels.js')

console.log(`User data: ${app.getPath('userData')}/config.json`)
