import React, { useState } from 'react'

import { useDiories } from '../diograph/utils/useDiories'

import { ContentCarousel } from './ContentCarousel'
import { ContentView } from './ContentView'

const getAddressPath = (address) => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

const getNextIndex = (index, length) => {
  const isLast = index === length - 1
  return isLast ? 0 : index + 1
}

const getContent = ({ encodingFormat, contentUrl }, path) => ({
  url: contentUrl.startsWith('/') ? `${path}${contentUrl}` : contentUrl,
  type: encodingFormat,
})

export const useContent = () => {
  const [index, setIndex] = useState(0)

  const { story = {} } = useDiories()
  const { data = [] } = story
  if (!data.length) {
    return {}
  }

  const contentIndex = Math.min(index, data.length - 1)
  const path = getAddressPath(story.key)
  return {
    content: getContent(data[contentIndex], path),
    carousel: {
      selected: contentIndex,
      amount: data.length,
      onClick: () => setIndex(getNextIndex(contentIndex, data.length)),
    },
  }
}
