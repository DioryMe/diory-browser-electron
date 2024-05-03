import { validateDiograph } from './validateDiograph'

class DioryClientAdapter {
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
    // dioryClient used
    this.dioryClient.connections = connections
    this.dioryClient.diosphere.resetRooms()
    await this.dioryClient.getDiosphere()
    // sync
    this.diosphere = this.getDiosphereObject()
    // this.diosphere = this.dioryClient.diosphere
    this.connections = this.dioryClient.connections
    this.dataClients = this.dioryClient.dataClients

    await this.enterRoom({ id: '/' })

    // Validate
    validateDiograph(this.dioryClient.diograph.toObject())
  }

  enterRoom = async (roomObject) => {
    // dioryClient used
    // this.dioryClient.room = this.diosphere.getRoom(roomObject)
    this.room = this.getDiosphereObject().rooms['home-room']
    this.dioryClient.room = this.room
    this.dioryClient.diograph.resetDiograph()
    await this.dioryClient.getDiograph()
    // sync
    this.diograph = this.dioryClient.diograph
    // this.room = this.dioryClient.room

    this.diory = this.diograph.getDiory({ id: '/' })
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
    // return this.dioryClient.room.toObject()
  }

  getDioryInFocus = () => {
    return this.diory.toObject()
  }
}

export { DioryClientAdapter }
