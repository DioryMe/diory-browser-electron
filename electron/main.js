const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { channels } = require('../src/shared/constants');
const home = require('../public/home.json');
const FolderTools = require('./lib/diograph-folder-tools')

let mainWindow;

function createWindow () {
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true,
  });
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  process.env.DEV_TOOLS && mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.GET_HOME, (event) => {
  event.sender.send(channels.GET_HOME, home);
});

const getRoom = id => {
  const path = Object.entries(home.rooms)
    .find(([key, room]) => id === room.id)[0]
  const diograph = require(`../public/${path}/diograph.json`)
  return { id, diograph }
}

ipcMain.on(channels.GET_ROOM, (event, id) => {
  event.sender.send(channels.GET_ROOM, getRoom(id));
});

ipcMain.on(channels.SAVE_ROOM, (event, { id, diograph }) => {
  const data = JSON.stringify(diograph)
  console.log('Saving room', id)
  fs.writeFile(`./public/${id}/diograph.json`, data, function(err) {
    if(err) {
      console.log(err)
      return event.sender.send(channels.SAVE_ROOM, null, err);
    }
    event.sender.send(channels.SAVE_ROOM, true);
  });
});

ipcMain.on(channels.CREATE_ROOM, (event, filePath) => {
  FolderTools.generateDiographJSON(filePath).then(diographData => {
    console.log(diographData)
    event.reply(channels.CREATE_ROOM, diographData)
  })
})
