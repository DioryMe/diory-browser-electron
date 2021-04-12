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
        'data',
      ])
      expect(generatedDiory.date).toEqual('2008-11-01T21:15:11.000Z')
      const imageContentUrl = `${process.env.INIT_CWD}/electron/readers/example-folder/some-image.jpg`
      expect(generatedDiory.image).toEqual(imageContentUrl)
      expect(generatedDiory.latitude).toEqual(43.464455)
      expect(generatedDiory.longitude).toEqual(11.881478333333334)
      expect(generatedDiory.data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'ImageObject',
        contentUrl: imageContentUrl,
        width: 640,
        height: 480,
        encodingFormat: 'image/jpeg',
      })
    })

    it('generates diory from video file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-video.mp4`

      await act()

      // TODO: Remove video attribute as now we have diory.data.contentUrl
      expect(Object.keys(generatedDiory)).toEqual([
        'id',
        'text',
        'video',
        'created',
        'modified',
        'data',
      ])
      expect(generatedDiory.text).toEqual('some-video')
      // TODO: Remove video attribute as now we have diory.data.contentUrl
      expect(generatedDiory.video).toEqual(
        `${process.env.INIT_CWD}/electron/readers/example-folder/some-video.mp4`
      )
      expect(generatedDiory.data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        contentUrl: `${process.env.INIT_CWD}/electron/readers/example-folder/some-video.mp4`,
        encodingFormat: 'video/x-m4v',
      })
    })

    it('generates diory from audio file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-music.mp3`

      await act()

      expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'created', 'modified', 'data'])
      expect(generatedDiory.text).toEqual('some-music')
      expect(generatedDiory.data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        contentUrl: `${process.env.INIT_CWD}/electron/readers/example-folder/some-music.mp3`,
        encodingFormat: 'audio/mpeg',
      })
    })

    const documentExtensionsAndMimeTypes = [
      ['docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      ['odt', 'application/vnd.oasis.opendocument.text'],
      ['pdf', 'application/pdf'],
    ]
    documentExtensionsAndMimeTypes.forEach(([extension, mimeType]) => {
      it(`generates diory from some-document.${extension} file`, async () => {
        filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-document.${extension}`

        await act()

        expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'created', 'modified', 'data'])
        expect(generatedDiory.text).toEqual('some-document')
        expect(generatedDiory.data).toEqual({
          '@context': 'https://schema.org',
          '@type': 'DigitalDocument',
          contentUrl: `${process.env.INIT_CWD}/electron/readers/example-folder/some-document.${extension}`,
          encodingFormat: mimeType,
        })
      })
    })

    it('generates diory from text file', async () => {
      filePath = `${process.env.INIT_CWD}/electron/readers/example-folder/some-text.txt`

      await act()

      expect(Object.keys(generatedDiory)).toEqual(['id', 'text', 'created', 'modified', 'data'])
      expect(generatedDiory.text).toEqual('some-text')
      expect(generatedDiory.data).toEqual({
        '@context': 'https://schema.org',
        '@type': 'DigitalDocument',
        contentUrl: `${process.env.INIT_CWD}/electron/readers/example-folder/some-text.txt`,
      })
    })
  })
})
