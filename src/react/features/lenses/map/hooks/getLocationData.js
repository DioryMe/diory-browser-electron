const getAverage = (array = []) =>
  array.length
    ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length
    : undefined

const concat = (array = [], item) =>
  typeof item !== 'undefined' ? array.concat(item) : array

export const getLocationData = ({ diory = {}, diorys = [] }) => {
  const locations = diorys.filter(
    ({ latitude, longitude }) => latitude && longitude
  )
  const latitudes = diorys.map(({ latitude }) => latitude)
  const longitudes = diorys.map(({ longitude }) => longitude)
  const lat = diory.latitude || getAverage(latitudes)
  const lng = diory.longitude || getAverage(longitudes)
  const latitudesAndLongitudesExists =
    (locations.length && diory.latitude && diory.longitude) || undefined
  return {
    center: lat &&
      lng && {
        lat,
        lng,
      },
    min: latitudesAndLongitudesExists && {
      lat: Math.min(...concat(latitudes, diory.latitude)),
      lng: Math.min(...concat(longitudes, diory.longitude)),
    },
    max: latitudesAndLongitudesExists && {
      lat: Math.max(...concat(latitudes, diory.latitude)),
      lng: Math.max(...concat(longitudes, diory.longitude)),
    },
  }
}
