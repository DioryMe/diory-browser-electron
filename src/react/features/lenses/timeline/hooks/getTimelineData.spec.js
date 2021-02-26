import { getTimelineData } from './getTimelineData'

const zeroLocation = { lat: 0, lng: 0 }
const dioryWithUndefinedDate = { date: undefined }

describe('getTimelineData', () => {
  describe('given diory with undefined date', () => {
    it('as diory', () => {
      const { diory } = getTimelineData({
        diory: dioryWithUndefinedDate,
      })
      expect(diory.center).toStrictEqual(zeroLocation)
    })
    it('as diorys', () => {
      const { diorys } = getTimelineData({
        diorys: [dioryWithUndefinedDate],
      })
      expect(diorys[0].center).toStrictEqual(zeroLocation)
    })
    it('as both diory and diorys', () => {
      const { diory, diorys } = getTimelineData({
        diory: dioryWithUndefinedDate,
        diorys: [dioryWithUndefinedDate],
      })
      expect(diory.center).toStrictEqual(zeroLocation)
      expect(diorys[0].center).toStrictEqual(zeroLocation)
    })
  })
})
