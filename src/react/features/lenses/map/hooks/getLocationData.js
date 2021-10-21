const concat = (array = [], item) => (typeof item !== 'undefined' ? array.concat(item) : array)

const getDioryLocation = ({ story, memories }) => {
  // eslint-disable-next-line no-unused-vars
  const { latlng } = story
  if (latlng) {
    const [latitude, longitude] = latlng.split(', ')
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    }
  }
  return {}
}

export const getDioryLocationData = ({ story = {}, memories = [] }) => {
  const locations = memories.filter(({ latlng }) => latlng)
  const latitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[0]))
  const longitudes = locations.map(({ latlng }) => parseFloat(latlng.split(', ')[1]))
  const { latitude, longitude } = getDioryLocation({ story, memories })

  return {
    id: story.id,
    center: !!longitude &&
      !!latitude && {
        lat: latitude,
        lng: longitude,
      },
    min: !!locations.length && {
      lat: Math.min(...concat(latitudes, story.latlng && parseFloat(story.latlng.split(', ')[0]))),
      lng: Math.min(...concat(longitudes, story.latlng && parseFloat(story.latlng.split(', ')[1]))),
    },
    max: !!locations.length && {
      lat: Math.max(...concat(latitudes, story.latlng && parseFloat(story.latlng.split(', ')[0]))),
      lng: Math.max(...concat(longitudes, story.latlng && parseFloat(story.latlng.split(', ')[1]))),
    },
  }
}

export const getLinksLocationData = ({ story, memories }) =>
  memories
    .map((child) => getDioryLocationData({ story: child, memories, parent: story }))
    .filter(({ center }) => !!center)

export const getLocationData = ({ story, memories }) => ({
  story: getDioryLocationData({ story, memories }),
  memories: getLinksLocationData({ story, memories }),
})
