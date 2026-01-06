import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useGenerateDiographEffect } from './useGenerateDiographEffect'

import { useStoryDiories } from './utils/useDiories'
import { useStoryContextDiories } from './utils/useContextDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/utils/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories'
import { useSelectedDiories } from '../tools/utils/useSelectedDiories'
import { useToggleContent } from '../content/utils/useToggleContent'
import { useGoSide } from '../navigation/utils/useGoSide'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'
import { DiographNavigation } from './DiographNavigation'

export const Diograph = () => {
  useGenerateDiographEffect()

  const { forward = [] } = useSelector((state) => state.navigation)
  const { story, memories } = useStoryDiories()
  const { context, stories, contexts } = useStoryContextDiories()

  const { goLeft, goRight } = useGoSide()
  const { mapSelectedDiory } = useSelectedDiories()
  return (
    <>
      <DiographNavigation
        story={story}
        stories={stories}
        context={context}
        contexts={contexts}
        onClick={useSelectStory()}
      />
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
    </>
  )
}
