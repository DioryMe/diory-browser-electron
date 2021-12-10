const { convertDiographUrlsRelative, makeRelative } = require('./convertDiographUrlsRelative')

describe('makeRelative', () => {
  it('works', () => {
    const url =
      'D:\\Users\\lifegallerist\\Desktop\\My Diory\\diory-demo-content\\Mary\\PIXNIO-53747-4118x3088.jpeg'
    const baseUrl = 'D:\\Users\\lifegallerist\\Desktop\\My Diory'
    const response = makeRelative(url, baseUrl)
    expect(response).toEqual('diory-demo-content/Mary/PIXNIO-53747-4118x3088.jpeg')
  })
})

describe('convertDiographUrlsRelative', () => {
  const macDiory = {
    image: '/base/url/image/path',
    data: [
      {
        contentUrl: '/base/url/content/url',
        noBaseUrl: '/no/base/url/content/url',
        someUrl: '/base/url/some/url',
      },
    ],
  }

  const windowsDiory = {
    image: 'C:\\base\\url\\image\\path',
    data: [
      {
        contentUrl: 'C:\\base\\url\\content\\url',
        noBaseUrl: 'C:\\no\\base\\url\\content\\url',
        someUrl: 'C:\\base\\url\\some\\url',
      },
    ],
  }

  describe('converts diograph to relative paths', () => {
    let baseUrl
    let absoluteDiograph
    let relativeDiograph

    afterEach(() => {
      // Converts diory.image and diory.data.contentUrl to relative
      expect(relativeDiograph['some-id'].image).toEqual('image/path')
      expect(relativeDiograph['some-id'].data[0].contentUrl).toEqual('content/url')
      expect(relativeDiograph['some-other-id'].image).toEqual('image/path')
      expect(relativeDiograph['some-other-id'].data[0].contentUrl).toEqual('content/url')
    })

    describe('Mac paths', () => {
      beforeEach(() => {
        baseUrl = '/base/url'
        absoluteDiograph = {
          'some-id': macDiory,
          'some-other-id': macDiory,
        }
      })

      it('works', () => {
        relativeDiograph = convertDiographUrlsRelative({ diograph: absoluteDiograph, baseUrl })
        expect(relativeDiograph['some-id'].data[0].someUrl).toEqual(macDiory.data[0].someUrl)
        expect(relativeDiograph['some-other-id'].data[0].noBaseUrl).toEqual(
          macDiory.data[0].noBaseUrl
        )
      })
    })

    describe('Windows paths', () => {
      beforeEach(() => {
        baseUrl = 'C:\\base\\url'
        absoluteDiograph = {
          'some-id': windowsDiory,
          'some-other-id': windowsDiory,
        }
      })

      it('works', () => {
        relativeDiograph = convertDiographUrlsRelative({ diograph: absoluteDiograph, baseUrl })
        expect(relativeDiograph['some-id'].data[0].someUrl).toEqual(windowsDiory.data[0].someUrl)
        expect(relativeDiograph['some-other-id'].data[0].noBaseUrl).toEqual(
          windowsDiory.data[0].noBaseUrl
        )
      })
    })
  })

  describe('authentic examples', () => {
    it('Windows', () => {
      const absoluteDiograph = {
        'some-id': {
          image:
            'D:\\Users\\lifegallerist\\Desktop\\My Diory\\diory-demo-content\\Mary\\PIXNIO-53747-4118x3088.jpeg',
        },
      }
      const baseUrl = 'D:\\Users\\lifegallerist\\Desktop\\My Diory'
      const relativeDiograph = convertDiographUrlsRelative({
        diograph: absoluteDiograph,
        baseUrl,
      })
      expect(relativeDiograph['some-id'].image).toEqual(
        'diory-demo-content/Mary/PIXNIO-53747-4118x3088.jpeg'
      )
    })
  })
})
