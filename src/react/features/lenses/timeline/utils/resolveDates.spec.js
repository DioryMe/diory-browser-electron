import { resolveDates } from './resolveDates'

describe('resolveTimeperiods', () => {
  describe('given more than 3 years', () => {
    it('returns years', () => {
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
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
      const timePeriods = resolveDates(
        new Date('2020-12-30T20:00:00Z').getTime(),
        new Date('2021-01-02T03:00:01Z').getTime()
      )

      expect(timePeriods).toMatchInlineSnapshot(`
        Array [
          "2020-12-30",
          "2020-12-31",
          "2021-01-01",
          "2021-01-02",
        ]
      `)
    })
  })
})
