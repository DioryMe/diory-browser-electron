const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

const getDioryLocation = ({ diory, diorys }) => {
  // eslint-disable-next-line no-unused-vars
  const { latlng } = diory
  if (latlng) {
    const [latitude, longitude] = latlng.split(', ')
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    }
  }
  return {}
}

export const getDioryLocationData = ({ diory = {}, diorys = [] }) => {
  const locations = diorys.filter(({ latlng }) => latlng)
  const latitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[0]))
  const longitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[1]))
  const { latitude, longitude } = getDioryLocation({ diory, diorys })

  return {
    id: diory.id,
    center: !!longitude &&
      !!latitude && {
        lat: latitude,
        lng: longitude,
      },
    min: !!locations.length && {
      lat: Math.min(...concat(latitudes, diory.latlng && parseFloat(diory.latlng.split(', ')[0]))),
      lng: Math.min(...concat(longitudes, diory.latlng && parseFloat(diory.latlng.split(', ')[1]))),
    },
    max: !!locations.length && {
      lat: Math.max(...concat(latitudes, diory.latlng && parseFloat(diory.latlng.split(', ')[0]))),
      lng: Math.max(...concat(longitudes, diory.latlng && parseFloat(diory.latlng.split(', ')[1]))),
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
