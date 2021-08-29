const io = require("socket.io-client");

// CONNECT TO SOCKET
var socket = io("http://localhost:9210");

// SEND MESSAGE
socket.emit('setFocus', 'generic-content')

// RECEIVE MESSAGE
socket.on('welcome', () => {
  console.log("I was welcomed")
})
