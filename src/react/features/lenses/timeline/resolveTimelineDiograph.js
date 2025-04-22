import { getDefaultImage, isDefaultImage } from '../../../../shared/getDefaultImage'
import { resolveTimePeriods } from './resolveTimePeriods'

const formatToTimelineDiory = (date) => {
  const validDate = date.length === 13 ? `${date}:00` : date
  return ({
    id: date,
    text: validDate.split('T').join(' '),
    date: new Date(validDate).toISOString(),
  })
}

const mapMemoriesToLinks = (memories) => (diory) => {
  const links = memories.filter(({ date }) => date && date.startsWith(diory.id))
  return ({
    ...diory,
    image: links.map(({ image }) => image).filter(Boolean).find((image) => !isDefaultImage(image)) || getDefaultImage(),
    links: links.map(({ key }) => ({ id: key })),
  })
}

export const resolveTimelineDiograph = (memories) => {
  const dates = Object.values(memories).map(({ date }) => date).filter(Boolean).map((isoDate) => new Date(isoDate).getTime())
  const minDate = Math.min(...dates)
  const maxDate = Math.max(...dates)

  const timePeriods = resolveTimePeriods(minDate, maxDate)
  const timelineMemories = timePeriods.map(formatToTimelineDiory).map(mapMemoriesToLinks(memories)).filter(({ links }) => links && links.length)
  const timelineStory = {
    id: 'timeline',
    text: 'Timeline',
    links: timelineMemories.map(({ id }) => ({ id }))
  }

  return {
    story: timelineStory,
    memories: timelineMemories,
    diograph: timelineMemories.reduce((obj, diory) => {
      obj[diory.id] = diory
      return obj
    }, { timeline: timelineStory })
  }
}
