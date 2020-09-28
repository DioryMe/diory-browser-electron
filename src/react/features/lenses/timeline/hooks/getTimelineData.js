const getAverage = (array = []) =>
  array.length ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length : undefined

const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

export const getDateLongitude = ({ date }) =>
  (Date.parse(date) / Date.parse('1971-01-01T00:00:00.000Z')) * 10

export const getLongitudeDate = (lng) =>
  new Date(lng * Date.parse('1971-01-01T00:00:00.000Z') / 10)

const getDioryDateLongitude = ({ diory, diorys, parent }) => {
  const { date } = diory
  if (date) {
    return {
      dateLongitude: getDateLongitude({ date }),
    }
  }
  const dioryDates = diorys.filter(({ date }) => date).map(({ date }) => date)

  if (dioryDates.length > 1) {
    return {
      dateLongitude: getAverage(dioryDates),
    }
  }

  if (parent) {
    return {
      dateLongitude: getDateLongitude(parent.date) + diorys.indexOf(diory) * 0.0001,
    }
  }

  return {}
}

export const getTimelineData = ({ diory = {}, diorys = [], parent }) => {
  const dateLongitudes = diorys.filter(({ date }) => date).map(getDateLongitude)
  const { dateLongitude } = getDioryDateLongitude({ diory, diorys, parent })

  return {
    id: diory.id,
    center: {
      lat: 0,
      lng: dateLongitude,
    },
    min: dateLongitudes.length && {
      lat: 0,
      lng: Math.min(...concat(dateLongitudes, dateLongitude)),
    },
    max: dateLongitudes.length && {
      lat: 0,
      lng: Math.max(...concat(dateLongitudes, dateLongitude)),
    },
  }
}
