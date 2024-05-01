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
