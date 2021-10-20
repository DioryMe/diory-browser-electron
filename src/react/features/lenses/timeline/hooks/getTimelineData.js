const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

export const getDateLongitude = ({ date }) =>
  (Date.parse(date) / Date.parse('1971-01-01T00:00:00.000Z')) * 10

export const getLongitudeDate = (lng) =>
  new Date((lng * Date.parse('1971-01-01T00:00:00.000Z')) / 10)

export const getIsoDate = (lng) =>
  new Date((lng * Date.parse('1971-01-01T00:00:00.000Z')) / 10).toISOString()

const getDioryDateLongitude = ({ diory, memories, parent }) => {
  const { date } = diory
  if (date) {
    return {
      lng: getDateLongitude({ date }),
    }
  }

  return {}
}

const getDioryTimelineData = ({ diory = {}, memories = [], parent }) => {
  const dateLongitudes = memories.filter(({ date }) => date).map(getDateLongitude)
  const { lng } = getDioryDateLongitude({ diory, memories, parent })
  return {
    id: diory.id,
    center: lng && {
      lat: 0,
      lng,
    },
    min: {
      lat: 0,
      lng: dateLongitudes.length > 1 ? Math.min(...concat(dateLongitudes, lng)) : 200,
    },
    max: {
      lat: 0,
      lng: dateLongitudes.length > 1 ? Math.max(...concat(dateLongitudes, lng)) : 550,
    },
  }
}

const getLinksTimelineData = ({ diory = {}, memories = [] }) =>
  memories
    .map((child) => getDioryTimelineData({ diory: child, memories, parent: diory }))
    .filter(({ center }) => !!center)

export const getTimelineData = ({ diory, memories }) => ({
  diory: getDioryTimelineData({ diory, memories }),
  memories: getLinksTimelineData({ diory, memories }),
})
