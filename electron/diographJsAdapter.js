const { validateDiograph } = require('./validateDiograph')
const { constructAndLoadRoom } = require('@diograph/utils')
const { LocalClient: LocalClient2 } = require('@diograph/local-client2')

class DiographJsAdapter {
  constructor() {
    this.loadedRoom = null
    this.diograph = null
  }

  initialise = async () => {
    await this.enterRoom({ id: '/' })
  }

  enterRoom = async (roomObject) => {
    if (roomObject.id === '/') {
      roomObject.id = 'home-room'
    }
    const id = roomObject.id
    const address = this.getDiosphereObject().rooms[roomObject.id].connections[0].address
    const clientType = this.getDiosphereObject().rooms[roomObject.id].connections[0].client
    console.log('THIS IS THE PLACE TO CHANGE THE ROOM', id, address, clientType)

    this.loadedRoom = await this.getRoom(address, clientType)
    this.diograph = this.loadedRoom.diograph

    this.room = this.getDiosphereObject().rooms['home-room']
    validateDiograph(this.diograph.toObject())
    this.diory = this.diograph.getDiory({ id: '/' })
  }

  saveRoom = async () => {
    if (this.loadedRoom) {
      await this.loadedRoom.saveRoom()
      console.log('room saved', this.loadedRoom)
    }
  }

  getRoom = async (address, clientType) => {
    return constructAndLoadRoom(address, clientType, {
      LocalClient: {
        clientConstructor: LocalClient2,
      },
    })
  }

  getDiosphereObject = () => {
    return {
      rooms: {
        '/': {
          id: 'home-room',
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T14:56:21.243Z',
        },
        'home-room': {
          id: 'home-room',
          text: 'Home room (/tmp)',
          doors: [
            {
              id: 'image-room-id',
            },
            {
              id: 'the-diory',
            },
            {
              id: 'demo-content-room-source',
            },
          ],
          connections: [
            {
              client: 'LocalClient',
              address: '/tmp',
            },
          ],
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T14:56:21.243Z',
        },
        'image-room-id': {
          id: 'image-room-id',
          text: 'Demo content room',
          doors: [],
          connections: [
            {
              client: 'LocalClient',
              address: '/Users/Jouni/Code/demo-content-room',
            },
          ],
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T15:02:47.539Z',
        },
      },
    }
  }

  getDiograph = () => {
    console.log('diograph', this.diograph)
    return this.diograph
  }

  getRoomInFocus = () => {
    return this.room
  }

  getDioryInFocus = () => {
    return this.diory.toObject()
  }

  getContent = async (cid) => {
    const content = await this.loadedRoom.getContent(cid)
    return content
  }

  getLoadedRoom = () => {
    return this.loadedRoom
  }
}

module.exports = { DiographJsAdapter }
