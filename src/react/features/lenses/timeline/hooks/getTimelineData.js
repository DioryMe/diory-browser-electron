const getAverage = (array = []) =>
  array.length ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length : undefined

const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

export const getDateLongitude = ({ date }) =>
  (Date.parse(date) / Date.parse('1971-01-01T00:00:00.000Z')) * 10

export const getLongitudeDate = (lng) =>
  new Date((lng * Date.parse('1971-01-01T00:00:00.000Z')) / 10)

const getDioryDateLongitude = ({ diory, diorys, parent }) => {
  const { date } = diory
  if (date) {
    return {
      lng: getDateLongitude({ date }),
    }
  }
  const dioryDateLongitudes = diorys.filter(({ date }) => date).map(getDateLongitude)

  if (dioryDateLongitudes.length) {
    return {
      lng: getAverage(dioryDateLongitudes),
    }
  }

  if (parent) {
    return {
      lng: getDateLongitude(parent.date) + diorys.indexOf(diory) * 0.0001,
    }
  }

  return {}
}

export const getDioryTimelineData = ({ diory = {}, diorys = [], parent }) => {
  const dateLongitudes = diorys.filter(({ date }) => date).map(getDateLongitude)
  const { lng } = getDioryDateLongitude({ diory, diorys, parent })
  return (
    lng && {
      id: diory.id,
      center: {
        lat: 0,
        lng,
      },
      min: dateLongitudes.length > 1 && {
        lat: 0,
        lng: Math.min(...concat(dateLongitudes, lng)),
      },
      max: dateLongitudes.length > 1 && {
        lat: 0,
        lng: Math.max(...concat(dateLongitudes, lng)),
      },
    }
  )
}

export const getLinksTimelineData = ({ diory, diorys }) =>
  diorys
    .map((child) => getDioryTimelineData({ diory: child, diorys, parent: diory }))
    .filter(Boolean)
