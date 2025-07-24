import React from 'react'
import { Pane } from 'evergreen-ui'

import { useToggleContent } from './useToggleContent'

import { useContentCarousel } from './components/useContentCarousel'
import { useStoryDiories } from '../diograph/utils/useDiories'

import { ContentView } from './ContentView'
import { ContentCarousel } from './components/ContentCarousel'
import { useSelectDiory } from '../tools/useSelectDiory'

const getAddressPath = (address = '') => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

export const useContentActions = () => {
  const { story = {} } = useStoryDiories()

  const { toggleContent } = useToggleContent()
  const { selectDiory } = useSelectDiory()

  return {
    onContentClick: () => {
      toggleContent()
      selectDiory(story)
    },
  }
}

const Content = () => {
  const { story = {} } = useStoryDiories()
  const { data = [] } = story
  const path = getAddressPath(story.key)
  const { content, carousel } = useContentCarousel(data, path)
  const { onContentClick } = useContentActions()

  return content ? (
    <ContentCarousel {...carousel}>
      <Pane position="relative" height="100%" onClick={onContentClick}>
        <ContentView {...content} />
      </Pane>
    </ContentCarousel>
  ) : null
}

export default Content
