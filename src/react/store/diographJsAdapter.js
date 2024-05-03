import { validateDiograph } from './validateDiograph'

class DiographJsAdapter {
  constructor(client) {
    this.dioryClient = client
    this.connections = this.dioryClient.connections
    this.dataClients = this.dioryClient.dataClients
    this.diosphere = this.dioryClient.diosphere
    this.diograph = this.dioryClient.diograph
    this.room = this.dioryClient.room
    this.diory = this.dioryClient.diory
  }

  initialise = async (connections) => {
    await this.enterRoom({ id: '/' })
  }

  enterRoom = async (roomObject) => {
    this.room = this.getDiosphereObject().rooms['home-room']
    validateDiograph(window.room.diograph.toObject())
    this.diograph = window.room.diograph
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
              connections: [
                {
                  client: 'LocalClient',
                  address: '/Users/Jouni/Code/demo-content-room',
                  key: 'image-room-key',
                },
              ],
            },
            {
              id: 'the-diory',
              connections: [
                {
                  client: 'LocalClient',
                  address: '/Users/Jouni/My Diories/TheDiory/My Diory',
                  key: 'the-diory',
                },
              ],
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
              key: 'image-room-key',
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
              key: 'the-diory',
            },
          ],
          created: '2024-03-24T14:56:21.243Z',
          modified: '2024-03-24T15:02:47.539Z',
        },
      },
    }
  }

  getDiograph = () => {
    return this.dioryClient.diograph.toObject()
  }

  getRoomInFocus = () => {
    return this.room
  }

  getDioryInFocus = () => {
    return this.diory.toObject()
  }
}

export { DiographJsAdapter }
