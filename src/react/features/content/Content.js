import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useToggleContent } from './utils/useToggleContent'
import { useContentCarousel } from './components/useContentCarousel'

import { getStoryDiories } from '../diograph/utils/getStoryDiories'

import { ContentView } from './components/ContentView'
import { ContentCarousel } from './components/ContentCarousel'

const getAddressPath = (address = '') => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

const Content = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { storyKey } = useSelector((state) => state.navigation)
  const { story = {} } = getStoryDiories(storyKey, diograph)

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
