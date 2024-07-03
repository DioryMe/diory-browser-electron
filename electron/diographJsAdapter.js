// eslint-disable-next-line import/no-unresolved
const { validateDiograph } = require('@diograph/diograph/validator')
const { constructAndLoadRoom } = require('@diograph/diograph')
const { LocalClient: LocalClient2 } = require('@diograph/local-client2')
const fs = require('fs')
const ini = require('ini')
const { validateDiosphere } = require('./validateDiosphere')

function DiographJsAdapter() {
  this.loadedRoom = null
  this.loadedDiograph = null
  this.diosphere = diosphereClass
  this.diory = {}
  this.room = {}
  this.diograph = {}
  this.dioryInFocus = null

  this.initialiseDiograph = async (roomObject) => {
    await this.selectRoom(roomObject)

    this.focusDiory({ id: '/' })

    return this.diograph
  }

  this.initialiseDiosphere = async (connections) => {
    await this.selectRoom({ id: '/' })
  }

  this.selectRoom = async (roomObject) => {
    const roomId = roomObject.id === '/' ? 'room-1' : roomObject.id
    this.roomConfig = this.diosphere.toObject().rooms[roomId]
    const { address } = this.roomConfig.connections[0]
    const clientType = this.roomConfig.connections[0].client

    this.loadedRoom = await this.getRoom(address, clientType)
    this.loadedDiograph = this.loadedRoom.diograph

    validateDiograph(this.loadedDiograph.toObject())
    this.dioryInFocus = this.loadedDiograph.getDiory({ id: '/' })
  }

  this.getRoom = async (address, clientType) =>
    constructAndLoadRoom(address, clientType, {
      LocalClient: {
        clientConstructor: LocalClient2,
      },
    })

  this.focusDiory = (dioryObject) => this.loadedDiograph.getDiory(dioryObject)

  // async importDiograph(connection) {
  //   await this.client.importDiograph([connection])
  // },

  this.room.toObject = () => this.roomConfig

  // Because of Electron object serialization all the methods needs to be on the same level
  // - that's why this.loadedDiograph is used instead of this.diograph
  this.diograph.initialise = (diographData) => {
    this.loadedDiograph.initialise(diographData)
  }

  this.diograph.addDiory = (dioryData, alias) => {
    this.loadedDiograph.addDiory(dioryData, alias)
  }

  this.diograph.updateDiory = (dioryData) => {
    this.loadedDiograph.updateDiory(dioryData)
  }

  this.diograph.removeDiory = (dioryData) => {
    this.loadedDiograph.removeDiory(dioryData)
  }

  this.diograph.addDioryLink = (dioryObject, linkedDioryObject) => {
    this.loadedDiograph.addDioryLink(dioryObject, linkedDioryObject)
  }

  this.diograph.removeDioryLink = (dioryObject, linkedDioryObject) => {
    this.loadedDiograph.removeDioryLink(dioryObject, linkedDioryObject)
  }

  this.diograph.resetDiograph = () => {
    this.loadedDiograph.resetDiograph()
  }

  this.diograph.toObject = () => this.loadedDiograph.toObject()

  this.diory.toObject = () => this.dioryInFocus.toObject()

  this.getLoadedRoom = () => this.loadedRoom
}

// Diosphere class doesn't do anything dynamic so it can be defined like this
const diosphereClass = {
  addRoom() {
    throw new Error('Not implemented')
  },

  updateRoom() {
    throw new Error('Not implemented')
  },

  removeRoom() {
    throw new Error('Not implemented')
  },

  addRoomDoor() {
    throw new Error('Not implemented')
  },

  removeRoomDoor() {
    throw new Error('Not implemented')
  },

  resetRooms() {
    throw new Error('Not implemented')
  },

  toObject() {
    // const diosphereObject = require('../public/diory-demo-content/diosphere.json')
    const dotDcliContent = fs.readFileSync('/Users/Jouni/.dcli', 'utf-8')
    const parsedDotDcli = ini.parse(dotDcliContent)
    const diosphereObject = convertDotDcliToDiosphere(parsedDotDcli)
    validateDiosphere(diosphereObject)
    // console.log('diosphereObject', JSON.stringify(diosphereObject))
    // console.log('diosphereObject', diosphereObject)
    return diosphereObject
  },
}

function convertDotDcliToDiosphere(dotDcliObject) {
  const rooms = Object.keys(dotDcliObject.rooms).reduce((acc, key) => {
    const room = {
      id: key,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
      text: key,
      doors: [],
      connections: [
        {
          address: dotDcliObject.rooms[key].address,
          client: dotDcliObject.rooms[key].clientType,
        },
      ],
    }
    acc[key] = room
    return acc
  }, {})

  rooms['home-room'] = {
    id: 'home-room',
    text: 'Home room',
    connections: [
      {
        client: 'LocalClient',
        address: '/Users/Jouni/Code/Oopee-diory/diory-browser-electron/public/diory-demo-content',
      },
    ],
    created: '2024-03-24T14:56:21.243Z',
    modified: '2024-03-24T14:56:21.243Z',
  }

  rooms['home-room'].doors = Object.keys(rooms)
    .filter((key) => key !== 'home-room')
    .map((key) => ({ id: key }))

  rooms['/'] = {
    id: 'home-room',
    created: '2024-03-24T14:56:21.243Z',
    modified: '2024-03-24T14:56:21.243Z',
  }

  return { rooms }
}

module.exports = { DiographJsAdapter }
