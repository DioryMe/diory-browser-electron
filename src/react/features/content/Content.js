import React from 'react'
import { Pane } from 'evergreen-ui'

import { useContent } from './useContent'

import { ContentCarousel } from './ContentCarousel'
import { ContentView } from './ContentView'

// TODO actions
const Content = () => {
  const { content, carousel } = useContent()
  return content ? (
    <ContentCarousel {...carousel}>
      <Pane position="relative" height="100%">
        <ContentView {...content} />
      </Pane>
    </ContentCarousel>
  ) : null
}

export default Content
