const fs = require('fs')
const { readJson } = require('./readJson')

describe('readJson', () => {
  describe('returns diograph object', () => {
    it('valid diograph.json path', async () => {
      const diographJsonPath = './public/diory-demo-content'

      const response = await readJson('diograph.json')(diographJsonPath)

      const diographJsonRawContents = fs.readFileSync(`${diographJsonPath}/diograph.json`)
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
    it('folder path only (although diograph.json inside)', async () => {
      diographJsonPath = './public/diory-demo-content'
      const callDiographJson = () => readJson('')(diographJsonPath)
      expect(callDiographJson).toThrowError()
    })

    it('non-json text file', async () => {
      diographJsonPath = './electron/readers/example-folder'
      const callDiographJson = () => readJson('some-text.txt')(diographJsonPath)
      expect(callDiographJson).toThrowError()
    })
  })

  describe('throws error', () => {
    it('invalid path', () => {
      const callDiographJson = () => readJson('some.file')('./some/invalid/path')
      expect(callDiographJson).toThrowError()
    })
  })
})
