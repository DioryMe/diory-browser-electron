import { validateDiosphere } from '../../shared/validateDiosphere'

// eslint-disable-next-line import/no-unresolved
const { validateDiograph } = require('@diograph/diograph/validator')

function DioryClientAdapter(client) {
  this.dioryClient = client
  this.diosphere = this.dioryClient.diosphere
  this.room = this.dioryClient.room
  this.diograph = this.dioryClient.diograph
  this.diory = this.dioryClient.diory
}

Object.assign(DioryClientAdapter.prototype, {
  async initialiseDiosphere(connections) {
    await this.dioryClient.initialiseDiosphere(connections)

    validateDiosphere(this.dioryClient.diosphere.toObject())

    // sync internal changes from dioryClient after initialiseDiosphere
    this.room = this.dioryClient.room
    this.diosphere = this.dioryClient.diosphere
  },

  async initialiseDiograph(roomObject) {
    await this.dioryClient.initialiseDiograph(roomObject)

    if (Object.keys(this.dioryClient.diograph.toObject()).length > 0) {
      validateDiograph(this.dioryClient.diograph.toObject())
    }

    // sync internal changes from dioryClient after initialiseDiograph
    this.room = this.dioryClient.room
    this.diograph = this.dioryClient.diograph
    this.diory = this.dioryClient.diory
  },

  focusDiory(dioryObject) {
    this.client.focusDiory(dioryObject)
  },

  diograph: {
    initialise(diographData) {
      this.diograph.initialise(diographData)
    },

    addDiory(dioryData, alias) {
      this.diograph.addDiory(dioryData, alias)
    },

    updateDiory(dioryData) {
      this.diograph.updateDiory(dioryData)
    },

    removeDiory(dioryData) {
      this.diograph.removeDiory(dioryData)
    },

    addDioryLink(dioryObject, linkedDioryObject) {
      this.diograph.addDioryLink(dioryObject, linkedDioryObject)
    },

    removeDioryLink(dioryObject, linkedDioryObject) {
      this.diograph.removeDioryLink(dioryObject, linkedDioryObject)
    },

    resetDiograph() {
      this.diograph.resetDiograph()
    },

    toObject() {
      return this.diograph.toObject()
    },
  },

  diory: {
    toObject() {
      return this.diory.toObject()
    },
  },
})

export { DioryClientAdapter }
