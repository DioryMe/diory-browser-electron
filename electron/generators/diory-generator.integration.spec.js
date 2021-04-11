const { generateDioryFromFile } = require('./diory-generator')

describe('diograph-generator', () => {
  let act
  let filePath
  let generatedDiory
  beforeEach(() => {
    act = async () => {
      generatedDiory = await generateDioryFromFile(filePath)
    }
  })

  describe('generateDioryFromFile', () => {
    it('generates diory from image file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-image.jpg`

      await act()

      expect(Object.keys(generatedDiory)).toEqual([
        'id',
        'image',
        'date',
        'latitude',
        'longitude',
        'created',
        'modified',
      ])
      expect(generatedDiory.date).toEqual('2008-11-01T21:15:11.000Z')
      expect(generatedDiory.image.toString()).toEqual(
        `file://${process.env.INIT_CWD}/electron/readers/example-folder/some-image.jpg`
      )
      expect(generatedDiory.latitude).toEqual(43.464455)
      expect(generatedDiory.longitude).toEqual(11.881478333333334)
    })

    it('generates diory from video file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-video.mp4`

      await act()

      expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'video', 'created', 'modified'])
      expect(generatedDiory.text).toEqual('some-video.mp4')
      expect(generatedDiory.video.toString()).toEqual(
        `file://${process.env.INIT_CWD}/electron/readers/example-folder/some-video.mp4`
      )
    })

    it('generates diory from audio file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-music.mp3`

      await act()

      expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'created', 'modified'])
      expect(generatedDiory.text).toEqual('some-music')
    })

    it('generates diory from document file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-document.pdf`

      await act()

      expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'created', 'modified'])
      expect(generatedDiory.text).toEqual('some-document')
    })
  })
})
