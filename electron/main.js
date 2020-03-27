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

  if (process.env.DEV_BUILD) {
    // Enable loadFile: showing images from external folder
    // - disables using localhost:3300 & React hot-reload
    // - requires running `yarn run build`
    mainWindow.loadFile('build/index.html')
  } else {
    // Enable loadURL: hot-reload of React stuff while running Electron app
    // - disables showing images from external folder
    //    - it tries to load them from localhost:3300 which fails
    mainWindow.loadURL(
      process.env.ELECTRON_START_URL ||
        url.format({
          pathname: path.join(__dirname, '../index.html'),
          protocol: 'file:',
          slashes: true,
        })
    )
  }

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
  const files = glob.sync(path.join(__dirname, 'channels/**/*.js'));
  files.forEach((file) => require(file));
}

loadChannels()
