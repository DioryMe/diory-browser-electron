const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
const url = require('url')
const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer')

require('electron-reload')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron/preload.js'),
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
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.whenReady().then(() => {
  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
})

// Menu
const template = [{ role: 'appMenu' }, { role: 'fileMenu' }, { role: 'editMenu' }]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

// Store
// eslint-disable-next-line import/newline-after-import
const Store = require('electron-store')
Store.initRenderer()

// Choose folder native dialog
// eslint-disable-next-line import/newline-after-import
const { showOpenDialog } = require('./electron/lib/show-open-dialog')
ipcMain.handle('showOpenDialog', showOpenDialog)

console.log(`User data: ${app.getPath('userData')}/config.json`)
