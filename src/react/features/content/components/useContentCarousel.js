import { useState } from 'react'

const getNextIndex = (index, length) => {
  const isLast = index === length - 1
  return isLast ? 0 : index + 1
}

const getContent = ({ encodingFormat, contentUrl }, path) => ({
  url: contentUrl.startsWith('/') ? `${path}${contentUrl}` : contentUrl,
  type: encodingFormat,
})

export const useContentCarousel = (data, path) => {
  const [index, setIndex] = useState(0)

  if (!data.length) {
    return {}
  }

  const contentIndex = Math.min(index, data.length - 1)
  return {
    content: getContent(data[contentIndex], path),
    carousel: {
      selected: contentIndex,
      amount: data.length,
      onClick: () => setIndex(getNextIndex(contentIndex, data.length)),
    },
  }
}
