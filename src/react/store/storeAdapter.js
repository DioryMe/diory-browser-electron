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

  initialise = async (param) => {
    await this.dioryClient.initialise(param)
    this.connections = this.dioryClient.connections
    this.dataClients = this.dioryClient.dataClients
    this.diosphere = this.dioryClient.diosphere
    this.diograph = this.dioryClient.diograph
    this.room = this.dioryClient.room
    this.diory = this.dioryClient.diory

    // Validate
    validateDiograph(this.dioryClient.diograph.toObject())

    // --------

    // const roomClientType = 'S3Client'
    // const address = 's3://jvalanen-diory-test3/room/'
    // const credentials = {
    //   region: 'eu-west-1',
    //   credentials: {
    //     accessKeyId: '',
    //     secretAccessKey: '',
    //   },
    // }
    // const room = await constructAndLoadRoom(address, roomClientType, {
    //   S3Client: {
    //     clientConstructor: S3Client,
    //     credentials,
    //   },
    // })

    // room.diograph.initialise = () => {}
    // this.dioryClient.diograph = room.diograph
    // this.diograph = room.diograph

    // // Validate
    // validateDiograph(this.dioryClient.diograph.toObject())

    // console.log('bau', this.dioryClient.diograph.toObject())
  }

  enterRoom = async (param) => {
    await this.dioryClient.enterRoom(param)
    this.connections = this.dioryClient.connections
    this.dataClients = this.dioryClient.dataClients
    this.diosphere = this.dioryClient.diosphere
    this.diograph = this.dioryClient.diograph
    this.room = this.dioryClient.room
    this.diory = this.dioryClient.diory
  }
}

export { StoreAdapter }
