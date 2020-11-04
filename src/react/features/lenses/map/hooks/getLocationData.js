const getAverage = (array = []) =>
  array.length ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length : undefined

const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

const interpolateCoordinate = (location1, date1, location2, date2, date) =>
  ((location2 - location1) / (Date.parse(date2) - Date.parse(date1))) *
    (Date.parse(date) - Date.parse(date1)) +
  location1

function getTwoClosestLocations(diorys, dioryDate) {
  const diorysInTimeline = diorys.sort((location1, location2) =>
    location1.date < location2.date ? -1 : 1
  )

  let nextIndex
  nextIndex = diorysInTimeline.findIndex((location) => location.date > dioryDate)
  if (nextIndex < 1) {
    const firstDate = diorysInTimeline[0].date
    if (dioryDate < firstDate) {
      nextIndex = 1 // two first diorys
    } else {
      nextIndex = diorysInTimeline.length - 1 // two last diorys
    }
  }

  return {
    firstLocation: diorysInTimeline[nextIndex - 1],
    secondLocation: diorysInTimeline[nextIndex],
  }
}

function interpolateLocation(diorys, date) {
  const { firstLocation, secondLocation } = getTwoClosestLocations(diorys, date)
  return {
    longitude: interpolateCoordinate(
      firstLocation.longitude,
      firstLocation.date,
      secondLocation.longitude,
      secondLocation.date,
      date
    ),
    latitude: interpolateCoordinate(
      firstLocation.latitude,
      firstLocation.date,
      secondLocation.latitude,
      secondLocation.date,
      date
    ),
  }
}

function getAverageLocation(diorysWithLocations) {
  const latitudes = diorysWithLocations.map(({ latitude }) => latitude)
  const longitudes = diorysWithLocations.map(({ longitude }) => longitude)
  return {
    longitude: getAverage(longitudes),
    latitude: getAverage(latitudes),
  }
}

const getDioryLocation = ({ diory, diorys }) => {
  const { longitude, latitude, date } = diory
  if (longitude && latitude) {
    return {
      longitude,
      latitude,
    }
  }
  const diorysWithLocations = diorys.filter(({ latitude, longitude }) => latitude && longitude)

  if (diorysWithLocations.length > 1) {
    if (date) {
      return interpolateLocation(diorysWithLocations, date)
    }

    return getAverageLocation(diorysWithLocations)
  }

  return {}
}

export const getLocationData = ({ diory = {}, diorys = [] }) => {
  const locations = diorys.filter(({ latitude, longitude }) => latitude && longitude)
  const latitudes = locations.map(({ latitude }) => latitude)
  const longitudes = locations.map(({ longitude }) => longitude)
  const { latitude, longitude } = getDioryLocation({ diory, diorys })

  return {
    center: longitude &&
      latitude && {
        lat: latitude,
        lng: longitude,
      },
    min: locations.length && {
      lat: Math.min(...concat(latitudes, diory.latitude)),
      lng: Math.min(...concat(longitudes, diory.longitude)),
    },
    max: locations.length && {
      lat: Math.max(...concat(latitudes, diory.latitude)),
      lng: Math.max(...concat(longitudes, diory.longitude)),
    },
  }
}
