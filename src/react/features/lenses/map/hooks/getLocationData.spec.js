import { getDioryLocationData } from './getLocationData'

describe('getDioryLocationData', () => {
  describe('given diory location', () => {
    it('returns center', () => {
      const { center } = getDioryLocationData({
        diory: {
          latlng: '12.34, 123.45',
        },
      })
      expect(center).toStrictEqual({
        lat: 12.34,
        lng: 123.45,
      })
    })

    describe('given diorys with location', () => {
      it('returns min and max locations of diorys', () => {
        const { min, max } = getDioryLocationData({
          diory: {
            latlng: '0, 30',
          },
          diorys: [
            {
              latlng: '10, 20',
            },
            {
              latlng: '20, 10',
            },
          ],
        })
        expect(min).toStrictEqual({
          lat: 0,
          lng: 10,
        })
        expect(max).toStrictEqual({
          lat: 20,
          lng: 30,
        })
      })
    })
  })

  describe('given no diory location', () => {
    const noDioryLocation = [
      {
        latlng: undefined,
      },
    ]

    noDioryLocation.forEach((diory) => {
      it('returns false center', () => {
        const { center } = getDioryLocationData({ diory })
        expect(center).toBe(false)
      })
    })

    it('returns false center', () => {
      const { center } = getDioryLocationData({
        diory: {
          latlng: undefined,
        },
      })
      expect(center).toBe(false)
    })

    describe('given diorys with location', () => {
      it('returns false center', () => {
        const { center } = getDioryLocationData({
          diorys: [
            {
              latlng: '10, 20',
            },
            {
              latlng: '20, 10',
            },
          ],
        })

        expect(center).toEqual(false)
      })

      it('returns min and max locations of diorys', () => {
        const { min, max } = getDioryLocationData({
          diorys: [
            {
              latlng: '10, 20',
            },
            {
              latlng: '20, 10',
            },
          ],
        })

        expect(min).toStrictEqual({
          lat: 10,
          lng: 10,
        })
        expect(max).toStrictEqual({
          lat: 20,
          lng: 20,
        })
      })
    })
  })

  describe('given some locations of diorys', () => {
    const someDiorysLocation = [
      {
        diorys: [
          {},
          {
            latlng: '10, 10',
          },
          {
            latlng: '20, 20',
          },
          {
            latlng: undefined,
          },
        ],
      },
    ]

    someDiorysLocation.forEach(({ diorys }) => {
      it('returns min and max of defined locations', () => {
        const { min, max } = getDioryLocationData({ diorys })
        expect(min).toStrictEqual({
          lat: 10,
          lng: 10,
        })
        expect(max).toStrictEqual({
          lat: 20,
          lng: 20,
        })
      })
    })
  })

  describe('given no locations of diorys', () => {
    const noDiorysLocation = [
      {
        diorys: [],
      },
      {
        diorys: [
          {},
          {
            latlng: undefined,
          },
          {
            latlng: undefined,
          },
        ],
      },
    ]

    noDiorysLocation.forEach(({ diorys }) => {
      it('returns undefined min and max', () => {
        const { min, max } = getDioryLocationData({ diorys })
        expect(min).toBe(false)
        expect(max).toBe(false)
      })
    })
  })
})
