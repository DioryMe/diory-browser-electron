// eslint-disable-next-line import/no-unresolved
const { validateDiograph } = require('@diograph/diograph/validator')
const { constructAndLoadRoom } = require('@diograph/diograph')
const { LocalClient: LocalClient2 } = require('@diograph/local-client2')
const { S3Client } = require('@diograph/s3-client')
const fs = require('fs')
const ini = require('ini')
const { validateDiosphere } = require('../src/shared/validateDiosphere')

function DcliAdapter() {
  this.diosphere = diosphereClass
  this.room = {}
  this.diograph = {}
  this.diory = {}

  // DcliAdapter specific
  this.dioryInFocus = null
  this.loadedRoom = null
  this.loadedDiograph = null

  this.initialiseDiosphere = async (connections) => {
    await this.selectRoom({ id: '/' })
  }

  this.initialiseDiograph = async (roomObject) => {
    await this.selectRoom(roomObject)

    this.focusDiory({ id: '/' })

    return this.diograph
  }

  this.focusDiory = (dioryObject) => this.loadedDiograph.getDiory(dioryObject)

  this.room.toObject = () => this.roomConfig

  // Because of Electron object serialization all the methods needs to be on the same level
  // - that's why this.loadedDiograph is used instead of this.diograph
  this.diograph.initialise = (diographData) => this.loadedDiograph.initialise(diographData)

  this.diograph.addDiory = (dioryData, alias) => {
    const diory = this.loadedDiograph.addDiory(dioryData, alias)
    this.loadedRoom.saveRoom()
    return diory
  }

  this.diograph.updateDiory = (dioryData) => {
    const diory = this.loadedDiograph.updateDiory(dioryData)
    this.loadedRoom.saveRoom()
    return diory
  }

  this.diograph.removeDiory = (dioryData) => {
    const diory = this.loadedDiograph.removeDiory(dioryData)
    this.loadedRoom.saveRoom()
    return diory
  }

  this.diograph.addDioryLink = (dioryObject, linkedDioryObject) => {
    const diory = this.loadedDiograph.addDioryLink(dioryObject, linkedDioryObject)
    this.loadedRoom.saveRoom()
    return diory
  }

  this.diograph.removeDioryLink = (dioryObject, linkedDioryObject) => {
    const diory = this.loadedDiograph.removeDioryLink(dioryObject, linkedDioryObject)
    this.loadedRoom.saveRoom()
    return diory
  }

  this.diograph.resetDiograph = () => this.loadedDiograph.resetDiograph()

  this.diograph.toObject = () => this.loadedDiograph.toObject()

  this.diory.toObject = () => this.dioryInFocus.toObject()

  // DcliAdapter specific
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

  this.getRoom = async (address, clientType) => {
    const credentials = {
      region: 'eu-west-1',
      credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY || '',
        secretAccessKey: process.env.BUCKET_SECRET_KEY || '',
      },
    }
    return constructAndLoadRoom(address, clientType, {
      LocalClient: {
        clientConstructor: LocalClient2,
      },
      S3Client: { clientConstructor: S3Client, credentials },
    })
  }

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

module.exports = { DcliAdapter }
