import React from 'react'
import { Pane } from 'evergreen-ui'

import { useToggleContent } from './useToggleContent'

import { useContentCarousel } from './components/useContentCarousel'
import { useStoryDiories } from '../diograph/utils/useDiories'

import { ContentView } from './ContentView'
import { ContentCarousel } from './components/ContentCarousel'

const getAddressPath = (address = '') => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

const Content = () => {
  const { story = {} } = useStoryDiories()
  const { data = [] } = story
  const path = getAddressPath(story.key)
  const { content, carousel } = useContentCarousel(data, path)
  const toggleContent = useToggleContent()

  return content ? (
    <ContentCarousel {...carousel}>
      <Pane position="relative" height="100%" onClick={toggleContent}>
        <ContentView {...content} />
      </Pane>
    </ContentCarousel>
  ) : null
}

export default Content
