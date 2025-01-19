import { getDioryLocationData } from './getLocationData'

describe('getDioryLocationData', () => {
  describe('given story location', () => {
    it('returns center', () => {
      const { center } = getDioryLocationData({
        story: {
          latlng: '12.34, 123.45',
        },
      })
      expect(center).toStrictEqual({
        lat: 12.34,
        lng: 123.45,
      })
    })

    describe('given memories with location', () => {
      it('returns min and max locations of memories', () => {
        const { min, max } = getDioryLocationData({
          story: {
            latlng: '0, 30',
          },
          memories: [
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

  describe('given no story location', () => {
    const noDioryLocation = [
      {
        latlng: undefined,
      },
    ]

    noDioryLocation.forEach((story) => {
      it('returns false center', () => {
        const { center } = getDioryLocationData({ story })
        expect(center).toBe(false)
      })
    })

    it('returns false center', () => {
      const { center } = getDioryLocationData({
        story: {
          latlng: undefined,
        },
      })
      expect(center).toBe(false)
    })

    describe('given memories with location', () => {
      it('returns false center', () => {
        const { center } = getDioryLocationData({
          memories: [
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

      it('returns min and max locations of memories', () => {
        const { min, max } = getDioryLocationData({
          memories: [
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

  describe('given some locations of memories', () => {
    const someDiorysLocation = [
      {
        memories: [
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

    someDiorysLocation.forEach(({ memories }) => {
      it('returns min and max of defined locations', () => {
        const { min, max } = getDioryLocationData({ memories })
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

  describe('given no locations of memories', () => {
    const noDiorysLocation = [
      {
        memories: [],
      },
      {
        memories: [
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

    noDiorysLocation.forEach(({ memories }) => {
      it('returns undefined min and max', () => {
        const { min, max } = getDioryLocationData({ memories })
        expect(min).toBe(false)
        expect(max).toBe(false)
      })
    })
  })
})
