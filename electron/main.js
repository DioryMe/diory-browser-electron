const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { channels } = require('../src/shared/constants');
const home = require('../public/home.json');

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

ipcMain.on(channels.HOME, (event) => {
  event.sender.send(channels.HOME, home);
});

const getRoom = id => {
  const path = Object.entries(home.rooms)
    .find(([key, room]) => id === room.id)[0]
  const diograph = require(`../public/${path}/diograph.json`)
  return { id, diograph }
}

ipcMain.on(channels.ROOM, (event, id) => {
  event.sender.send(channels.ROOM, getRoom(id));
});

ipcMain.on(channels.UPDATE_ROOM, (event, { id, diograph }) => {
  fs.writeFile(`./public/${id}/diograph.json`, JSON.stringify(diograph), function(err) {
    if(err) {
      return event.sender.send(channels.UPDATE_ROOM, null, err);
    }
    event.sender.send(channels.UPDATE_ROOM, true);
  });
});
