const { app, BrowserWindow, ipcMain } = require('electron')
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

const { showOpenDialog } = require('./electron/channels/show-open-dialog')
ipcMain.handle('showOpenDialog', showOpenDialog)

const Store = require('electron-store')
Store.initRenderer()

console.log(`User data: ${app.getPath('userData')}/config.json`)


// IPC SOCKET SERVER

const express = require('express');
const expressApp = express();
const http = require('http');
const server = http.createServer(expressApp);
const { Server } = require('socket.io');
const io = new Server(server);

// CONNECTION
io.on('connection', (socket) => {
  // SEND MESSAGE
  socket.emit('Welcome!')

  // RECEIVE ACTIONS
  socket.on('setFocus', (dioryId) => {
    console.log('setFocus: ' + dioryId);
    mainWindow.webContents.send('setFocus', dioryId);
  });

});

// RUN SERVER
server.listen(9210, () => {
  console.log('listening on *:9210');
});
