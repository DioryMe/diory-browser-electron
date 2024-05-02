import { S3Client } from '@diograph/s3-client'
import { constructAndLoadRoom } from '@diograph/utils'
import { validateDiograph } from './validateDiograph'

class StoreAdapter {
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
    this.diosphere = this.dioryClient.diosphere
    // sync
    this.connections = this.dioryClient.connections
    this.dataClients = this.dioryClient.dataClients

    await this.enterRoom({ id: '/' })

    // Validate
    validateDiograph(this.dioryClient.diograph.toObject())

    // --------

    // const room = await window.room

    // room.diograph.initialise = () => {}
    // this.dioryClient.diograph = room.diograph
    // this.diograph = room.diograph

    // // Validate
    // validateDiograph(this.dioryClient.diograph.toObject())

    // console.log('bau', this.dioryClient.diograph.toObject())
  }

  enterRoom = async (roomObject) => {
    // dioryClient used
    this.dioryClient.room = this.diosphere.getRoom(roomObject)
    this.dioryClient.diograph.resetDiograph()
    await this.dioryClient.getDiograph()
    // sync
    this.diograph = this.dioryClient.diograph
    this.room = this.dioryClient.room

    this.diory = this.diograph.getDiory({ id: '/' })
  }

  getDiosphere = () => {
    return this.dioryClient.diosphere.toObject()
  }

  getDiograph = () => {
    return this.dioryClient.diograph.toObject()
  }

  getRoomInFocus = () => {
    return this.dioryClient.room.toObject()
  }

  getDioryInFocus = () => {
    return this.diory.toObject()
  }
}

export { StoreAdapter }
