import { resolveTimePeriods } from './resolveTimePeriods'

describe('resolveTimeperiods', () => {
  describe('given more than 3 years', () => {
    it('returns years', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-12-31T00:00:00').getTime(),
        new Date('2025-01-01T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
          "2025",
        ]
      `)
    })

    it('returns years', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-06-01T00:00:00').getTime(),
        new Date('2024-06-02T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ]
      `)
    })
  })

  describe('given more than 2 months', () => {
    it('returns months', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-12-31T00:00:00').getTime(),
        new Date('2021-03-01T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020-12",
          "2021-01",
          "2021-02",
          "2021-03",
        ]
      `)
    })

    it('returns months', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2021-01-01T00:00:00').getTime(),
        new Date('2021-03-03T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2021-01",
          "2021-02",
          "2021-03",
        ]
      `)
    })
  })

  describe('given more than 3 days', () => {
    it('returns days', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-12-31T00:00:00').getTime(),
        new Date('2021-01-03T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020-12-31",
          "2021-01-01",
          "2021-01-02",
          "2021-01-03",
        ]
      `)
    })

    it('returns days in normal year', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2021-02-27T00:00:00').getTime(),
        new Date('2021-03-02T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2021-02-27",
          "2021-02-28",
          "2021-03-01",
          "2021-03-02",
        ]
      `)
    })

    it('returns days in leap year', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-02-27T00:00:00').getTime(),
        new Date('2020-03-01T00:00:01').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020-02-27",
          "2020-02-28",
          "2020-02-29",
          "2020-03-01",
        ]
      `)
    })
  })

  describe('given less than 3 days', () => {
    it('returns hours', () => {
      const timePeriods = resolveTimePeriods(
        new Date('2020-12-30T20:00:00Z').getTime(),
        new Date('2021-01-02T03:00:01Z').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020-12-30T20",
          "2020-12-30T21",
          "2020-12-30T22",
          "2020-12-30T23",
          "2020-12-31T00",
          "2020-12-31T01",
          "2020-12-31T02",
          "2020-12-31T03",
          "2020-12-31T04",
          "2020-12-31T05",
          "2020-12-31T06",
          "2020-12-31T07",
          "2020-12-31T08",
          "2020-12-31T09",
          "2020-12-31T10",
          "2020-12-31T11",
          "2020-12-31T12",
          "2020-12-31T13",
          "2020-12-31T14",
          "2020-12-31T15",
          "2020-12-31T16",
          "2020-12-31T17",
          "2020-12-31T18",
          "2020-12-31T19",
          "2020-12-31T20",
          "2020-12-31T21",
          "2020-12-31T22",
          "2020-12-31T23",
          "2021-01-01T00",
          "2021-01-01T01",
          "2021-01-01T02",
          "2021-01-01T03",
          "2021-01-01T04",
          "2021-01-01T05",
          "2021-01-01T06",
          "2021-01-01T07",
          "2021-01-01T08",
          "2021-01-01T09",
          "2021-01-01T10",
          "2021-01-01T11",
          "2021-01-01T12",
          "2021-01-01T13",
          "2021-01-01T14",
          "2021-01-01T15",
          "2021-01-01T16",
          "2021-01-01T17",
          "2021-01-01T18",
          "2021-01-01T19",
          "2021-01-01T20",
          "2021-01-01T21",
          "2021-01-01T22",
          "2021-01-01T23",
          "2021-01-02T00",
          "2021-01-02T01",
          "2021-01-02T02",
          "2021-01-02T03",
        ]
      `)
    })
  })
})
