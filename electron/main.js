const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const { channels } = require('../src/shared/constants');
const home = require('../public/home.json');
const FolderTools = require('./lib/diograph-folder-tools')

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile('build/index.html');
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

const getRoom = async (id) => {
  const paths = Object.entries(home.rooms)
    .find(([key, room]) => id === room.id)
  if (paths) {
    const diograph = require(`../public/${paths[0]}/diograph.json`)
    return { id, diograph }
  }

  const diograph = await FolderTools.generateDiograph(id)
  return { id, diograph }
}

ipcMain.on(channels.GET_ROOM, (event, id) => {
  getRoom(id).then(room => {
    console.log(room)
    event.sender.send(channels.GET_ROOM, room);
  })
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
  // DEFAULT PATH IS EXAMPLE-FOLDER PATH
  filePath = path.join(__dirname, 'spec/example-folder')
  FolderTools.generateRoom(filePath).then(room => {
    console.log(room)
    event.reply(channels.CREATE_ROOM, room)
  })
})
