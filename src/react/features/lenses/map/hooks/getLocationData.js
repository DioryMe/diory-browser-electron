const getAverage = (array = []) =>
  array.length
    ? array.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / array.length
    : undefined

export const getLocationData = ({ diory, diorys = [] }) => {
  const latitudes = diorys
    .filter(({ latitude }) => latitude)
    .map(({ latitude }) => latitude)
  const longitudes = diorys
    .filter(({ longitude }) => longitude)
    .map(({ longitude }) => longitude)
  const latitudesAndLongitudesExists = latitudes.length && longitudes.length
  const lat = diory.latitude || getAverage(latitudes)
  const lng = diory.longitude || getAverage(longitudes)
  return {
    center: lat &&
      lng && {
        lat,
        lng,
      },
    max: latitudesAndLongitudesExists && [
      Math.max(...latitudes, diory.latitude),
      Math.max(...longitudes, diory.longitude),
    ],
    min: latitudesAndLongitudesExists && [
      Math.min(...latitudes, diory.latitude),
      Math.min(...longitudes, diory.longitude),
    ],
  }
}
