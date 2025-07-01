import React from 'react'
import { Pane } from 'evergreen-ui'

import { useDeleteTool } from '../tools/delete'
import { useUpdateTool } from '../tools/update'
import { useToggleContent } from './useToggleContent'

import { useContentCarousel } from './components/useContentCarousel'
import { useDiories } from '../diograph/utils/useDiories'

import { ContentView } from './ContentView'
import { ContentCarousel } from './components/ContentCarousel'

const getAddressPath = (address) => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

export const useContentActions = () => {
  const { story = {} } = useDiories()

  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { toggleContent } = useToggleContent()

  return {
    onContentClick: () => {
      toggleContent()
      deleteDiory(story)
      updateDiory(story)
    },
  }
}

const Content = () => {
  const { story = {} } = useDiories()
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
