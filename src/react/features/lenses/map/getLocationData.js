const getAverage = (array = []) => array.length ? array.reduce((a,b) => parseFloat(a) + parseFloat(b), 0) / array.length : undefined

export const getLocationData = ({ diory, diorys = []}) => {
  const latitudes = diorys
    .filter(({ latitude }) => latitude)
    .map(({ latitude }) => latitude)
  const longitudes = diorys
    .filter(({ longitude }) => longitude)
    .map(({ longitude }) => longitude)
  const latitudesAndLongitudesExists = latitudes.length > 1 && longitudes.length > 1
  const lat = diory.latitude || getAverage(latitudes)
  const lng = diory.longitude || getAverage(longitudes)
  return {
    center: lat && lng && {
      lat,
      lng,
    },
    max: latitudesAndLongitudesExists && [
      Math.max(...latitudes),
      Math.max(...longitudes),
    ],
    min: latitudesAndLongitudesExists && [
      Math.min(...latitudes),
      Math.min(...longitudes),
    ],
  }
}
