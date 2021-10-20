const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

const getDioryLocation = ({ diory, memories }) => {
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

export const getDioryLocationData = ({ diory = {}, memories = [] }) => {
  const locations = memories.filter(({ latlng }) => latlng)
  const latitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[0]))
  const longitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[1]))
  const { latitude, longitude } = getDioryLocation({ diory, memories })

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

export const getLinksLocationData = ({ diory, memories }) =>
  memories
    .map((child) => getDioryLocationData({ diory: child, memories, parent: diory }))
    .filter(({ center }) => !!center)

export const getLocationData = ({ diory, memories }) => ({
  diory: getDioryLocationData({ diory, memories }),
  memories: getLinksLocationData({ diory, memories }),
})
