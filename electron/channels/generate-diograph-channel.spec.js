const { eventHandlerWrapper } = require('./channel-util')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')

jest.mock('../lib/save-diograph-json')
jest.mock('../lib/read-diograph-json')
jest.mock('../generators/diograph-generator')

describe('generateDiographEventHandler', () => {
  let act
  let params
  let someDiograph
  let responseObject

  beforeEach(() => {
    params = 'some-path'
    someDiograph = {
      rootId: 'some-root-diory-id',
      diograph: { 'some-root-diory-id': 'some-diory-object' },
    }
    responseObject = {
      ...someDiograph,
      path: 'some-path',
    }
    act = async () =>
      eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)('some-event', params)
  })

  describe('GIVEN diograph.json not found (readDiographJson returns undefined)', () => {
    beforeEach(() => {
      saveDiographJson.mockResolvedValue(undefined)
      readDiographJson.mockReturnValue({ rootId: undefined, diograph: undefined })
      generateDiograph.mockResolvedValue(someDiograph)
    })

    it('returns generateDiograph return value + path', async () => {
      const response = await act()
      expect(response).toEqual(responseObject)

      expect(generateDiograph).toHaveBeenCalledTimes(1)
      expect(generateDiograph).toHaveBeenCalledWith(params)

      expect(saveDiographJson).toHaveBeenCalledTimes(1)
      expect(saveDiographJson).toHaveBeenCalledWith(
        params,
        someDiograph.diograph,
        someDiograph.rootId
      )
    })
  })

  describe('GIVEN diograph.json found (readDiographJson returns diograph)', () => {
    beforeEach(() => {
      saveDiographJson.mockResolvedValue(undefined)
      readDiographJson.mockReturnValue(someDiograph)
    })

    describe('WHEN matching diograph.json and generated diograph', () => {
      beforeEach(() => {
        generateDiograph.mockResolvedValue(someDiograph)
      })

      it('returns readDiographJson return value + path', async () => {
        const response = await act()

        expect(response).toEqual(responseObject)
      })
    })

    describe('WHEN non-matching diograph.json and generated diograph', () => {
      beforeEach(() => {
        const someOtherDiograph = {
          rootId: someDiograph.rootId,
          diograph: {
            ...someDiograph.diograph,
            'some-other-diory-id': 'some-other-diory-object',
          },
        }
        generateDiograph.mockResolvedValue(someOtherDiograph)
      })

      it('returns readDiographJson return value + path', async () => {
        const response = await act()

        expect(response).toEqual(responseObject)
      })
    })
  })
})
