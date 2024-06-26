// TODO: Use from @diograph/diograph
// eslint-disable-next-line import/no-unresolved, no-unused-vars
import { validateDiograph } from './validateDiograph'

function DioryClientAdapter(client) {
  this.dioryClient = client
  this.dataClients = this.dioryClient.dataClients
  this.connections = this.dioryClient.connections
  this.diosphere = this.dioryClient.diosphere
  this.room = this.dioryClient.room
  this.diograph = this.dioryClient.diograph
  this.diory = this.dioryClient.diory
}

Object.assign(DioryClientAdapter.prototype, {
  async initialiseDiosphere(connections) {
    await this.dioryClient.initialiseDiosphere(connections)

    // TODO: Enable diosphere validation (+ generate schema)
    // validateDiograph(this.dioryClient.diograph.toObject())

    // sync
    this.room = this.dioryClient.room
    this.connections = this.dioryClient.connections
    this.diosphere = this.dioryClient.diosphere
  },

  async initialiseDiograph(roomObject) {
    await this.dioryClient.initialiseDiograph(roomObject)

    // TODO: Enable diograph validation
    // validateDiograph(this.dioryClient.diograph.toObject())

    // sync
    this.room = this.dioryClient.room
    this.diograph = this.dioryClient.diograph
    this.diory = this.dioryClient.diory
  },

  // async initialise(connections) {
  //   // dioryClient used
  //   this.dioryClient.connections = connections
  //   this.dioryClient.diosphere.resetRooms()
  //   await this.dioryClient.getDiosphere()
  //   // sync
  //   this.diosphere = this.dioryClient.diosphere
  //   this.connections = this.dioryClient.connections
  //   this.dataClients = this.dioryClient.dataClients
  //   await this.enterRoom({ id: '/' })
  //   // Validate
  //   validateDiograph(this.dioryClient.diograph.toObject())
  // },
  // async enterRoom(roomObject) {
  //   // dioryClient used
  //   this.dioryClient.room = this.diosphere.getRoom(roomObject)
  //   this.dioryClient.diograph.resetDiograph()
  //   await this.dioryClient.getDiograph()
  //   // sync
  //   this.diograph = this.dioryClient.diograph
  //   this.room = this.dioryClient.room
  //   this.diory = this.diograph.getDiory({ id: '/' })
  // },
  // getDiosphereObject() {
  //   return this.diosphere.toObject()
  // },
  // getDiograph() {
  //   return this.dioryClient.diograph.toObject()
  // },
  // getRoomInFocus() {
  //   return this.dioryClient.room.toObject()
  // },
  // getDioryInFocus() {
  //   return this.diory.toObject()
  // },
})

export { DioryClientAdapter }
