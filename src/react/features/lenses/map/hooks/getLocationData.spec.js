import { getLocationData } from './getLocationData'

describe('getLocationData', () => {
  describe('given diory location', () => {
    it('returns center', () => {
      const { center } = getLocationData({
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
        const { min, max } = getLocationData({
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

    noDioryLocation.forEach(diory => {
      it('returns undefined center', () => {
        const { center } = getLocationData({ diory })
        expect(center).toBe(undefined)
      })
    })

    it('returns undefined center', () => {
      const { center } = getLocationData({
        diory: {
          longitude: 'some-longitude',
        },
      })
      expect(center).toBe(undefined)
    })

    describe('given diorys with location', () => {
      it('returns center as average location of diorys', () => {
        const { center } = getLocationData({
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
        const { min, max } = getLocationData({
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

  describe('given no locations of diorys', () => {
    const noDiorysLocation = [
      {
        diorys: [
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
        const { min, max } = getLocationData({ diorys })
        expect(min).toBe(undefined)
        expect(max).toBe(undefined)
      })
    })
  })
})
