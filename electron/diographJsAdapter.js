// eslint-disable-next-line import/no-unresolved
const { validateDiograph } = require('@diograph/diograph/validator')
const { constructAndLoadRoom } = require('@diograph/diograph')
const { LocalClient: LocalClient2 } = require('@diograph/local-client2')

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
    const roomId = roomObject.id === '/' ? 'diograph-cli-room' : roomObject.id
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
    const diosphereObject = require('../public/diory-demo-content/diosphere.json')
    return diosphereObject
  },
}

module.exports = { DiographJsAdapter }
