const { eventHandlerWrapper } = require('./channel-util')
const { generateDiographEventHandler } = require('./generate-diograph-channel')
const { compareAndMergeDiographs } = require('./compare-and-merge-diographs')
const { generateDiograph } = require('../generators/diograph-generator')
const { saveDiographJson } = require('../lib/save-diograph-json')
const { readDiographJson } = require('../lib/read-diograph-json')

jest.mock('../lib/save-diograph-json')
jest.mock('../lib/read-diograph-json')
jest.mock('../generators/diograph-generator')
jest.mock('../channels/compare-and-merge-diographs')

describe('generateDiographEventHandler', () => {
  let act
  let params
  let someDiograph
  let mergedDiograph
  let someDiographResponse
  let mergedDiographResponse

  beforeEach(() => {
    params = 'some-path'
    someDiograph = {
      rootId: 'some-root-diory-id',
      diograph: { 'some-root-diory-id': 'some-diory-object' },
    }
    mergedDiograph = {
      rootId: 'some-root-diory-id2',
      diograph: { 'some-root-diory-id2': 'some-diory-object2' },
    }
    someDiographResponse = {
      ...someDiograph,
      path: 'some-path',
    }
    mergedDiographResponse = {
      ...mergedDiograph,
      path: 'some-path',
    }
    act = async () => eventHandlerWrapper('GENERATE_DIOGRAPH', generateDiographEventHandler)(params)
  })

  afterEach(() => {
    expect(readDiographJson).toHaveBeenCalledTimes(1)
    expect(readDiographJson).toHaveBeenCalledWith(params)
    expect(generateDiograph).toHaveBeenCalledTimes(1)
    expect(generateDiograph).toHaveBeenCalledWith(params)
    expect(saveDiographJson).toHaveBeenCalledTimes(1)
  })

  describe('GIVEN diograph.json not found (readDiographJson returns undefined)', () => {
    beforeEach(() => {
      readDiographJson.mockReturnValue(undefined)
      saveDiographJson.mockResolvedValue(undefined)
      generateDiograph.mockResolvedValue(someDiograph)
    })

    it('returns generateDiograph return value + path', async () => {
      const response = await act()

      expect(compareAndMergeDiographs).not.toHaveBeenCalled()
      expect(saveDiographJson).toHaveBeenCalledWith(
        params,
        someDiograph.diograph,
        someDiograph.rootId
      )
      expect(response).toEqual(someDiographResponse)
    })
  })

  describe('GIVEN diograph.json found (readDiographJson returns diograph)', () => {
    beforeEach(() => {
      generateDiograph.mockResolvedValue('generated-diograph')
      compareAndMergeDiographs.mockReturnValue(mergedDiograph)
      readDiographJson.mockReturnValue(someDiograph)
      saveDiographJson.mockResolvedValue(undefined)
    })

    it('returns compareAndMergeDiographs return value + path', async () => {
      const response = await act()

      expect(compareAndMergeDiographs).toHaveBeenCalledTimes(1)
      expect(compareAndMergeDiographs).toHaveBeenCalledWith(someDiograph, 'generated-diograph')
      expect(saveDiographJson).toHaveBeenCalledWith(
        params,
        mergedDiograph.diograph,
        mergedDiograph.rootId
      )
      expect(response).toEqual(mergedDiographResponse)
    })
  })
})
