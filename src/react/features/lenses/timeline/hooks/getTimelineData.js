const getAverage = (array = []) =>
  array.length ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length : undefined

const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

export const getDateLongitude = ({ date }) =>
  (Date.parse(date) / Date.parse('1971-01-01T00:00:00.000Z')) * 10

export const getLongitudeDate = (lng) =>
  new Date((lng * Date.parse('1971-01-01T00:00:00.000Z')) / 10)

export const getDateOffset = ({ date }) => new Date(date).getUTCSeconds() / 60

const getDioryDateLongitude = ({ diory, diorys, parent }) => {
  const { date } = diory
  if (date) {
    return {
      offset: getDateOffset({ date }),
      lng: getDateLongitude({ date }),
    }
  }
  const dioryDates = diorys.filter(({ date }) => date).map(({ date }) => date)

  if (dioryDates.length > 1) {
    const date = getAverage(dioryDates)
    return {
      offset: getDateOffset({ date }),
      lng: getDateLongitude({ date }),
    }
  }

  if (parent) {
    return {
      offset: getDateOffset(parent.date) + diorys.indexOf(diory) * 0.0001,
      lng: getDateLongitude(parent.date) + diorys.indexOf(diory) * 0.0001,
    }
  }

  return {}
}

export const getTimelineData = ({ diory = {}, diorys = [], parent }) => {
  const dateLongitudes = diorys.filter(({ date }) => date).map(getDateLongitude)
  const { offset, lng } = getDioryDateLongitude({ diory, diorys, parent })

  return {
    id: diory.id,
    offset,
    center: {
      lat: 0,
      lng,
    },
    min: dateLongitudes.length && {
      lat: 0,
      lng: Math.min(...concat(dateLongitudes, lng)),
    },
    max: dateLongitudes.length && {
      lat: 0,
      lng: Math.max(...concat(dateLongitudes, lng)),
    },
  }
}
