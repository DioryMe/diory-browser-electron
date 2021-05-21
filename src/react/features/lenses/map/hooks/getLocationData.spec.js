import { getDioryLocationData } from './getLocationData'

describe('getDioryLocationData', () => {
  describe('given diory location', () => {
    it('returns center', () => {
      const { center } = getDioryLocationData({
        diory: {
          latitude: 'some-latitude',
          longitude: 'some-longitude',
        },
      })
      expect(center).toStrictEqual({
        lat: 'some-latitude',
        lng: 'some-longitude',
      })
    })

    describe('given diorys with location', () => {
      it('returns min and max locations of diorys', () => {
        const { min, max } = getDioryLocationData({
          diory: {
            latitude: 0,
            longitude: 30,
          },
          diorys: [
            {
              latitude: 10,
              longitude: 20,
            },
            {
              latitude: 20,
              longitude: 10,
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
        latitude: undefined,
        longitude: undefined,
      },
      {
        latitude: 'some-latitude',
      },
      {
        longitude: 'some-longitude',
      },
      {
        latitude: undefined,
        longitude: 'some-longitude',
      },
      {
        latitude: NaN,
        longitude: 'some-longitude',
      },
      {
        latitude: null,
        longitude: 'some-longitude',
      },
      {
        latitude: '',
        longitude: 'some-longitude',
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
          longitude: 'some-longitude',
        },
      })
      expect(center).toBe(false)
    })

    describe('given diorys with location', () => {
      it('returns false center', () => {
        const { center } = getDioryLocationData({
          diorys: [
            {
              latitude: 10,
              longitude: 20,
            },
            {
              latitude: 20,
              longitude: 10,
            },
          ],
        })

        expect(center).toEqual(false)
      })

      it('returns min and max locations of diorys', () => {
        const { min, max } = getDioryLocationData({
          diorys: [
            {
              latitude: 10,
              longitude: 20,
            },
            {
              latitude: 20,
              longitude: 10,
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
            latitude: 10,
            longitude: 10,
          },
          {
            latitude: 20,
            longitude: 20,
          },
          {
            longitude: 30,
          },
        ],
      },
      {
        diorys: [
          {},
          {
            latitude: 10,
            longitude: 10,
          },
          {
            latitude: 20,
            longitude: 20,
          },
          {
            latitude: undefined,
            longitude: undefined,
          },
          {
            latitude: 10,
            longitude: NaN,
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
            latitude: 10,
          },
          {
            longitude: 10,
          },
        ],
      },
      {
        diorys: [
          {
            latitude: 10,
            longitude: null,
          },
          {
            latitude: 20,
            longitude: '',
          },
          {
            latitude: 10,
            longitude: undefined,
          },
          {
            latitude: 10,
            longitude: NaN,
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
