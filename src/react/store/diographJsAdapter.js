import { validateDiograph } from './validateDiograph'

class DiographJsAdapter {
  constructor(room) {
    this.diograph = room.diograph
  }

  initialise = async () => {
    await this.enterRoom({ id: '/' })
  }

  enterRoom = async (roomObject) => {
    this.room = this.getDiosphereObject().rooms['home-room']
    validateDiograph(this.diograph.toObject())
    this.diory = this.diograph.getDiory({ id: '/' })

    console.log('room', this.room)
    console.log('diograph', this.diograph)
    console.log('diory', this.diory)
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
          text: 'The Diory',
          id: 'the-diory',
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
