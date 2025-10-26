import { startsWithPeriod } from './startsWithPeriod'

const sortByDate = ({ date }) => date

const mapDiographToDiories = (diograph) =>
  Object.entries(diograph).map(([key, diory]) => ({ key, ...diory }))

const isPeriodId = (period) => {
  const date = new Date(period)
  return !Number.isNaN(date.valueOf())
}

export const getDioriesInPeriod = (selectedPeriod, diograph) =>
  mapDiographToDiories(diograph)
    .filter(startsWithPeriod(selectedPeriod))
    .filter(({ id }) => !isPeriodId(id))
    .sort(sortByDate)
