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

    beforeEach(() => {
      response = compareAndMergeDiographs(
        jsonDiograph('existing'),
        jsonDiograph('new-added-diories')
      )
      expect(response.rootId).toEqual(jsonDiograph('existing').rootId)
    })

    // Tämän tekee snapshot testi:
    // expect(response.diograph).toEqual({ ...originalDiograph.diograph, ...tampereDiory, ...mp4Diory })

    it('adds Tampere diory and links it to the root diory', () => {
      const newDiographAddedDiories = jsonDiograph('new-added-diories')
      const tampereId = '43563e8d-9599-46b7-b011-a90450fe4c81'
      const tampereDiory = newDiographAddedDiories.diograph[tampereId]
      expect(response.diograph[tampereId]).toEqual(tampereDiory)
      expect(response.diograph[response.rootId].links.Tampere).toEqual({ id: tampereId })
    })
  })
})
