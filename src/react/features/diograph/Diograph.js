import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useDiographEffect } from './useDiographEffect'
import { useStoryDiories } from './utils/useDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { useSelectedDiories } from '../tools/useSelectedDiories'
import { useToggleContent } from '../content/useToggleContent'

import { useGoSide } from '../navigation/utils/useGoSide'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'

export const Diograph = () => {
  useDiographEffect()

  const { forward = [] } = useSelector((state) => state.navigation)
  const { story, memories } = useStoryDiories()
  const { goLeft, goRight } = useGoSide()
  const { mapSelectedDiory } = useSelectedDiories()

  return (
    <Pane height="100%" position="relative">
      <NavigationToSide left onClick={goLeft} />
      <DiographView
        scrollIntoViewId={forward[0]}
        story={story}
        memories={memories.map(mapSelectedDiory)}
        onStoryClick={useToggleContent()}
        onMemoryClick={useSelectStory()}
        onSelect={useSelectDiory()}
        onDrop={useLinkDiories()}
      />
      <NavigationToSide right onClick={goRight} />
    </Pane>
  )
}
