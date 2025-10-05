import { isDefaultImage } from '../../../../../shared/getDefaultImage'
import { getDioriesInPeriod } from './getDioriesInPeriod'

export const findImage = (diories) =>
  diories
    .map(({ image }) => image)
    .filter(Boolean)
    .find((image) => !isDefaultImage(image))

export const createPeriodDiory = (period, diograph) => {
  const periodDiories = getDioriesInPeriod(period, diograph)
  const validDate = period.length === 13 ? `${period}:00` : period
  return {
    key: period,
    id: period,
    text: validDate.split('T').join(' '),
    date: new Date(validDate).toISOString(),
    image: findImage(periodDiories),
  }
}
