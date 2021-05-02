const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

const getDioryLocation = ({ diory, diorys }) => {
  const { longitude, latitude } = diory
  if (longitude && latitude) {
    return {
      longitude,
      latitude,
    }
  }

  return {}
}

export const getDioryLocationData = ({ diory = {}, diorys = [] }) => {
  const locations = diorys.filter(({ latitude, longitude }) => latitude && longitude)
  const latitudes = locations.map(({ latitude }) => latitude)
  const longitudes = locations.map(({ longitude }) => longitude)
  const { latitude, longitude } = getDioryLocation({ diory, diorys })

  return {
    id: diory.id,
    center: !!longitude &&
      !!latitude && {
        lat: latitude,
        lng: longitude,
      },
    min: !!locations.length && {
      lat: Math.min(...concat(latitudes, diory.latitude)),
      lng: Math.min(...concat(longitudes, diory.longitude)),
    },
    max: !!locations.length && {
      lat: Math.max(...concat(latitudes, diory.latitude)),
      lng: Math.max(...concat(longitudes, diory.longitude)),
    },
  }
}

export const getLinksLocationData = ({ diory, diorys }) =>
  diorys
    .map((child) => getDioryLocationData({ diory: child, diorys, parent: diory }))
    .filter(({ center }) => !!center)

export const getLocationData = ({ diory, diorys }) => ({
  diory: getDioryLocationData({ diory, diorys }),
  diorys: getLinksLocationData({ diory, diorys }),
})
