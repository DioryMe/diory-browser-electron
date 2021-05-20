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
      // Not valid scenarios when we validate format / input data
      // {
      //   latitude: 'some-latitude',
      // },
      // {
      //   longitude: 'some-longitude',
      // },
      // {
      //   latitude: undefined,
      //   longitude: 'some-longitude',
      // },
      // {
      //   latitude: NaN,
      //   longitude: 'some-longitude',
      // },
      // {
      //   latitude: null,
      //   longitude: 'some-longitude',
      // },
      // {
      //   latitude: '',
      //   longitude: 'some-longitude',
      // },
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
<<<<<<< HEAD
=======

      // Hopefully these interpolations will be thrown away so no need to convert them...
      // - uses interpolateLocation from getLocationData

      // describe('given diory with date between diorys dates', () => {
      //   it('interpolates diory location using diorys locations and date', () => {
      //     const { center } = getDioryLocationData({
      //       diory: {
      //         date: '2020-01-01T00:00:00Z',
      //       },
      //       diorys: [
      //         {
      //           date: '2016-01-01T00:00:00Z',
      //           latlng: '10, 20',
      //         },
      //         {
      //           date: '2021-01-01T00:00:00Z',
      //           latlng: '20, 20',
      //         },
      //       ],
      //     })
      //     expect(center).toStrictEqual({
      //       lat: 17.996715927750408,
      //       lng: 17.996715927750408,
      //     })
      //   })
      // })

      // describe('given diory with date before diorys dates', () => {
      //   it('interpolates diory location using diorys locations and date', () => {
      //     const { center } = getDioryLocationData({
      //       diory: {
      //         date: '2019-01-01T00:00:00Z',
      //       },
      //       diorys: [
      //         {
      //           date: '2020-01-01T00:00:00Z',
      //           latlng: '10, 10',
      //         },
      //         {
      //           date: '2021-01-01T00:00:00Z',
      //           latlng: '20, 20',
      //         },
      //       ],
      //     })
      //     expect(center).toStrictEqual({
      //       lat: 0.027322404371584952,
      //       lng: 0.027322404371584952,
      //     })
      //   })
      // })

      // describe('given diory with date after diorys dates', () => {
      //   it('interpolates diory location using diorys locations and date', () => {
      //     const { center } = getDioryLocationData({
      //       diory: {
      //         date: '2022-01-01T00:00:00Z',
      //       },
      //       diorys: [
      //         {
      //           date: '2020-01-01T00:00:00Z',
      //           latlng: '10, 10',
      //         },
      //         {
      //           date: '2021-01-01T00:00:00Z',
      //           latlng: '20, 20',
      //         },
      //       ],
      //     })
      //     expect(center).toStrictEqual({
      //       lat: 29.972677595628415,
      //       lng: 29.972677595628415,
      //     })
      //   })
      // })
>>>>>>> cddb2673 (DDA-144: getLocationData to use latlng (instead of latitude & longitude))
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
