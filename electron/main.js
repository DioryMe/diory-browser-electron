const { app, BrowserWindow } = require('electron')
const path = require('path')
const glob = require('glob')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  )

  mainWindow.on('closed', function() {
    mainWindow = null
  })
  process.env.DEV_TOOLS && mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})

function loadChannels() {
  const files = glob.sync(path.join(__dirname, 'channels/**/*.js'))
  files.forEach(file => require(file))
}

loadChannels()
