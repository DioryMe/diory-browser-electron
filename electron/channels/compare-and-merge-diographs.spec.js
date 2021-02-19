const fs = require('fs')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')

// Load static json fixtures
function jsonDiograph(filename) {
  return JSON.parse(fs.readFileSync(`./electron/channels/diograph-${filename}.json`))
}

describe('compareAndMergeDiographs', () => {
  describe('GIVEN diograph generated from same folder structure', () => {
    it('returns original diograph', () => {
      const response = compareAndMergeDiographs(jsonDiograph('existing'), jsonDiograph('new-same'))
      expect(response).toEqual(jsonDiograph('existing'))
    })
  })

  describe('GIVEN diograph with added diories', () => {
    let response
    let newDiographAddedDiories

    beforeEach(() => {
      response = compareAndMergeDiographs(
        jsonDiograph('existing'),
        jsonDiograph('new-added-diories')
      )
      newDiographAddedDiories = jsonDiograph('new-added-diories')
      expect(response.rootId).toEqual(jsonDiograph('existing').rootId)
    })

    it('adds Tampere diory and links it to the root diory (folder diory)', () => {
      const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
      const tampereDiory = newDiographAddedDiories.diograph[tampereId]
      expect(response.diograph[tampereId]).toEqual(tampereDiory)
      expect(response.diograph[response.rootId].links.Tampere).toEqual({ id: tampereId })
    })

    it('adds .mp4 diory and links it to the root diory (file diory)', () => {
      const mp4Id = '5212ee46-1f2f-4bdb-a6a1-c093de9d134f'
      const mp4Diory = newDiographAddedDiories.diograph[mp4Id]
      expect(response.diograph[mp4Id]).toEqual(mp4Diory)
      expect(response.diograph[response.rootId].links['4_5807613915332347351.mp4']).toEqual({
        id: mp4Id,
      })
    })

    it('adds Frenkell diory and links it to the Tampere diory (subfolder)', () => {
      const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
      const frenkellId = 'ebc844f5-76c0-4b44-a14a-f8d0c2b401f7'
      const frenkellDiory = newDiographAddedDiories.diograph[frenkellId]

      expect(response.diograph[frenkellId]).toEqual(frenkellDiory)
      expect(response.diograph[tampereId].links.Frenkell).toEqual({
        id: frenkellId,
      })
      // Shouldn't be linked to root diory!
      expect(response.diograph[response.rootId].links['frenkell.jpg']).not.toBeDefined()
    })

    it('adds tampere.jpg diory and links it to the Tampere diory (file in folder)', () => {
      const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
      const tampereJpgId = '1b435867-6e03-40c7-837b-35d9de80ea90'
      const tampereJpgDiory = newDiographAddedDiories.diograph[tampereJpgId]

      expect(response.diograph[tampereJpgId]).toEqual(tampereJpgDiory)
      expect(response.diograph[tampereId].links['tampere.jpg']).toEqual({
        id: tampereJpgId,
      })
      // Shouldn't be linked to root diory!
      expect(response.diograph[response.rootId].links['frenkell.jpg']).not.toBeDefined()
    })

    it('adds frenkell.jpg diory and links it to the Frenkell diory (file in subfolder)', () => {
      const frenkellId = 'ebc844f5-76c0-4b44-a14a-f8d0c2b401f7'
      const frenkellJpgId = 'fa8d4b50-fc13-4801-b5a6-d8d6c86a69bd'
      const frenkellJpgDiory = newDiographAddedDiories.diograph[frenkellJpgId]

      expect(response.diograph[frenkellJpgId]).toEqual(frenkellJpgDiory)
      expect(response.diograph[frenkellId].links['frenkell.jpg']).toEqual({
        id: frenkellJpgId,
      })
      // Shouldn't be linked to root diory!
      expect(response.diograph[response.rootId].links['frenkell.jpg']).not.toBeDefined()
    })
  })
})
