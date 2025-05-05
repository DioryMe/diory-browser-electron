import { getDefaultImage, isDefaultImage } from '../../../../../shared/getDefaultImage'
import { unique } from '../../../../utils/unique'

const findImage = (links) =>
  links
    .map(({ image }) => image)
    .filter(Boolean)
    .find((image) => !isDefaultImage(image)) || getDefaultImage()

const filterLinkDiograph = (timelineDate, diograph) =>
  Object.fromEntries(
    Object.entries(diograph).filter(
      ([_, { id, date }]) => date && date.startsWith(timelineDate) && id !== timelineDate
    )
  )

const createDateDiory = (diograph) => (date) => {
  const validDate = date.length === 13 ? `${date}:00` : date
  const linksDiograph = filterLinkDiograph(date, diograph)
  console.log(validDate)
  return {
    key: date,
    id: date,
    text: validDate.split('T').join(' '),
    date: new Date(validDate).toISOString(),
    image: findImage(Object.values(linksDiograph)),
    links: Object.keys(linksDiograph)
      .filter(unique)
      .map((id) => ({ id })),
  }
}

const filterByLinks = ({ links }) => links && links.length

const reduceToDiograph = (obj, diory) => {
  obj[diory.key] = diory
  return obj
}

export const getDatesDiograph = (dates, diograph) =>
  dates.map(createDateDiory(diograph)).filter(filterByLinks).reduce(reduceToDiograph, {})
