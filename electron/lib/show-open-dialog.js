const { dialog } = require('electron')

exports.showOpenDialog = () => dialog.showOpenDialog({ properties: ['openDirectory'] })
