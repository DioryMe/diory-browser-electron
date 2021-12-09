const fs = require('fs')
const { readDiographJson } = require('./read-diograph-json')

describe('readDiographJson', () => {
  describe('returns diograph object', () => {
    it('valid diograph.json path', async () => {
      const diographJsonPath = './public/diory-demo-content/diograph.json'

      const response = await readDiographJson({ diographJsonPath })

      const diographJsonRawContents = fs.readFileSync(diographJsonPath)
      const diographObject = JSON.parse(diographJsonRawContents)
      const returnValue = {
        rootId: diographObject.rootId,
        diograph: diographObject.diograph,
      }

      expect(response).toEqual(returnValue)
    })
  })

  describe('returns undefined', () => {
    let diographJsonPath
    afterEach(async () => {
      const callDiographJson = () => readDiographJson({ diographJsonPath })
      expect(callDiographJson).toThrowError()
    })

    it('folder path only (although diograph.json inside)', async () => {
      diographJsonPath = './public/diory-demo-content'
    })

    it('non-json text file', async () => {
      diographJsonPath = './electron/readers/example-folder/some-text.txt'
    })
  })

  describe('throws error', () => {
    it('invalid path', () => {
      const diographJsonPath = './some/invalid/path'
      const callDiographJson = () => readDiographJson({ diographJsonPath })
      expect(callDiographJson).toThrowError()
    })
  })
})
