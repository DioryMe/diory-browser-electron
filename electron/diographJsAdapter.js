// eslint-disable-next-line import/no-unresolved
const { validateDiograph } = require('@diograph/diograph/validator')
const { constructAndLoadRoom } = require('@diograph/diograph')
const { LocalClient: LocalClient2 } = require('@diograph/local-client2')

function DiographJsAdapter() {
  this.loadedRoom = null
  this.diograph = null
}

Object.assign(DiographJsAdapter.prototype, {
  async initialiseDiosphere(connections) {
    this.selectRoom({ id: '/' })
  },

  async selectRoom(roomObject) {
    const roomId = roomObject.id === '/' ? 'home-room' : roomObject.id
    const roomConfig = this.getDiosphereObject().rooms[roomId]
    const { address } = roomConfig.connections[0]
    const clientType = roomConfig.connections[0].client

    this.loadedRoom = await this.getRoom(address, clientType)
    this.diograph = this.loadedRoom.diograph
    this.room = roomConfig

    validateDiograph(this.diograph.toObject())
    this.diory = this.diograph.getDiory({ id: '/' })
  },

  async getRoom(address, clientType) {
    return constructAndLoadRoom(address, clientType, {
      LocalClient: {
        clientConstructor: LocalClient2,
      },
    })
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

  diosphere: {
    addRoom() {
      throw new Error('Not implemented')
    },

    updateRoom() {
      throw new Error('Not implemented')
    },

    removeRoom() {
      throw new Error('Not implemented')
    },

    addRoomDoor() {
      throw new Error('Not implemented')
    },

    removeRoomDoor() {
      throw new Error('Not implemented')
    },

    resetRooms() {
      throw new Error('Not implemented')
    },

    toObject() {
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
    },
  },
})

/* async */ function getContentUrlFromCID(contentUrl) {
  const contentUrls = {
    'pixnio-public-domain-test-content.txt':
      'diory-demo-content//Scouts BSA International/pixnio-public-domain-test-content.txt',
    bafkreidqzn2oioyvd62dc4cxvtbuwxcq6p7v5b3ro2i5yoofpa4ouppimy:
      'diory-demo-content//Scouts BSA International/PIXNIO-54454-6138x4092.jpeg',
    bafkreicuh7r63n4peyr6bluc3ebenq4lw4jh463d3mpdilnwaysn3us324:
      'diory-demo-content//Scouts BSA International/PIXNIO-53555-1782x1188.jpeg',
    bafkreif26at22ofail3cfun2hywmfzumzdml3ts53553ezsbcdsn2jnoem:
      'diory-demo-content//Scouts BSA International/PIXNIO-53553-1782x1188.jpeg',
    bafkreif4lt3vhlmxpcey4xooxlsoebpwfdwtflfwfru7d2meai2fb236eu:
      'diory-demo-content//Scouts BSA International/PIXNIO-53551-1782x1188.jpeg',
    bafkreic6ttvffo4di4jzsjveroqedyxirisudqfj6w6gcnuoaiikekxxje:
      'diory-demo-content//Scouts BSA International/PIXNIO-53549-1782x1188.jpeg',
    bafkreifgddwk2ymrc7neoniqdcolrgmvrfqfiknvbagusvxoa5hfca7cle:
      'diory-demo-content//Scouts BSA International/PIXNIO-53543-1782x1188.jpeg',
    bafkreie53fgzjsq4zobl6vcldgvll6orkoxzu5khyimrzda43mwt3y3qhm:
      'diory-demo-content//Scouts BSA International/PIXNIO-53541-1782x1188.jpeg',
    bafkreifhhmoftoo26lc223k5riwflm6uvgrizwakg5z7n7yruj7gty27ji:
      'diory-demo-content/Generic content/some-video.mov',
    bafkreihkqxpj4iwdw32vshr47qjme3fm3alwnar6ltngwscypf4jtpff6q:
      'diory-demo-content/Generic content/some-image.jpeg',
    'some-document.pdf': 'diory-demo-content/Generic content/some-document.pdf',
    'some-document.odt': 'diory-demo-content/Generic content/some-document.odt',
    'some-audio.m4a': 'diory-demo-content/Generic content/some-audio.m4a',
    bafkreihrnemuclicob3r3u6h2nqwjqfipryecd4lusoi4ecsb7cnpcnjgq:
      'diory-demo-content/Jane/PIXNIO-12700-2816x2112.jpeg',
    bafkreihvrvdnsthz2izl4beiuo6m3hceziss7khdxamzzqoz4p6pvzuham:
      'diory-demo-content/Jane/PIXNIO-12662-2816x2112.jpeg',
    bafkreie2zrz5q2go7ip4oy66j22fe3pgcqjbtlswag7bxurts3sgsklyo4:
      'diory-demo-content/Jane/PIXNIO-12656-2816x2112.jpeg',
    bafkreigpx2jl6dc3cnfiyttftplirxes7x73wxos7oaznatn6dcoqtzrny:
      'diory-demo-content//Potomac Kayaking Center/PIXNIO-54348-6177x4118.jpeg',
    bafkreihbdmt4bhosash53o535633m22xnz6ydhc47ein47oom4lj7kznlq:
      'diory-demo-content//Riverfest 2014/PIXNIO-53350-6177x4118.jpeg',
    bafkreihp3h6ggnxysuobjsgtsibaqq5khzjbaamyy6ec2adredtf2ixz3u:
      'diory-demo-content//Mary/PIXNIO-53799-6177x4118.jpeg',
    bafkreih2imdq3mpqshbzc4wipwdvuvm5zxqllpm5wahlnprmnxeqdgcdvu:
      'diory-demo-content//Mary/PIXNIO-53747-4118x3088.jpeg',
    bafkreicupadfckb4myc2yom5etx2co7eph5sg2lshcx7eameeijt6hlhza:
      'diory-demo-content//Adamstown Middle School/PIXNIO-54360-6177x4118.jpeg',
    bafkreihtiytevmyeiwqt7v4fj6ocb3nqioyjoh2nqzid7vrkshkndj5hdu:
      'diory-demo-content//Adamstown Middle School/PIXNIO-54298-5970x3980.jpeg',
  }

  if (Object.keys(contentUrls).includes(contentUrl)) {
    return contentUrls[contentUrl]
  }

  return contentUrl
}

module.exports = { DiographJsAdapter, getContentUrlFromCID }
