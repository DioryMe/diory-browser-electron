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
      it('returns center as average location of diorys', () => {
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

        expect(center).toStrictEqual({
          lat: 15,
          lng: 15,
        })
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

      describe('given diory with date between diorys dates', () => {
        it('interpolates diory location using diorys locations and date', () => {
          const { center } = getDioryLocationData({
            diory: {
              date: '2020-01-01T00:00:00Z',
            },
            diorys: [
              {
                date: '2016-01-01T00:00:00Z',
                latitude: 10,
                longitude: 10,
              },
              {
                date: '2021-01-01T00:00:00Z',
                latitude: 20,
                longitude: 20,
              },
            ],
          })
          expect(center).toStrictEqual({
            lat: 17.996715927750408,
            lng: 17.996715927750408,
          })
        })
      })

      describe('given diory with date before diorys dates', () => {
        it('interpolates diory location using diorys locations and date', () => {
          const { center } = getDioryLocationData({
            diory: {
              date: '2019-01-01T00:00:00Z',
            },
            diorys: [
              {
                date: '2020-01-01T00:00:00Z',
                latitude: 10,
                longitude: 10,
              },
              {
                date: '2021-01-01T00:00:00Z',
                latitude: 20,
                longitude: 20,
              },
            ],
          })
          expect(center).toStrictEqual({
            lat: 0.027322404371584952,
            lng: 0.027322404371584952,
          })
        })
      })

      describe('given diory with date after diorys dates', () => {
        it('interpolates diory location using diorys locations and date', () => {
          const { center } = getDioryLocationData({
            diory: {
              date: '2022-01-01T00:00:00Z',
            },
            diorys: [
              {
                date: '2020-01-01T00:00:00Z',
                latitude: 10,
                longitude: 10,
              },
              {
                date: '2021-01-01T00:00:00Z',
                latitude: 20,
                longitude: 20,
              },
            ],
          })
          expect(center).toStrictEqual({
            lat: 29.972677595628415,
            lng: 29.972677595628415,
          })
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
