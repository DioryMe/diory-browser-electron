import { validateDiograph } from './validateDiograph'

class DiographJsAdapter {
  constructor() {
    this.loadedRoom = null
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

    // STATIC LOADING
    // this.diograph = window.room.diograph

    // DYNAMIC LOADING
    this.loadedRoom = await window.getRoom(address, clientType)
    this.diograph = this.loadedRoom.diograph
    console.log(this.diograph)

    this.room = this.getDiosphereObject().rooms['home-room']
    validateDiograph(this.diograph.toObject())
    this.diory = this.diograph.getDiory({ id: '/' })

    console.log('room', this.room)
    console.log('diograph', this.diograph)
    console.log('diory', this.diory)
  }

  saveRoom = async () => {
    if (this.loadedRoom) {
      await this.loadedRoom.saveRoom()
      console.log('room saved', this.loadedRoom)
    }
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
          text: 'Home room',
          doors: [
            {
              id: 'image-room-id',
            },
            {
              id: 'the-diory',
            },
            {
              id: 'photo-room',
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
          text: 'Image rooms',
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
        'the-diory': {
          id: 'the-diory',
          text: 'The Diory',
          doors: [],
          connections: [
            {
              client: 'LocalClient',
              address: '/Users/Jouni/My Diories/TheDiory/My Diory',
            },
          ],
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T15:02:47.539Z',
        },
        'photo-room': {
          id: 'photo-room',
          text: 'Photo room',
          doors: [],
          connections: [
            {
              client: 'LocalClient',
              address: '/Users/Jouni/PhotoRoom/room',
            },
          ],
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T15:02:47.539Z',
        },
      },
    }
  }

  getDiograph = () => {
    return this.diograph.toObject()
  }

  getRoomInFocus = () => {
    return this.room
  }

  getDioryInFocus = () => {
    return this.diory.toObject()
  }
}

export { DiographJsAdapter }
