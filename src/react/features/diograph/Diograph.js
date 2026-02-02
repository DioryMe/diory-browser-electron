import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useGenerateDiographEffect } from './useGenerateDiographEffect'

import { getStoryDiories } from './utils/getStoryDiories'
import { useStoryContextDiories } from './utils/useContextDiories'

import { useOnSelectStory } from '../tools/onSelectStory'
import { useOnSelectDiory } from '../tools/onSelectDiory/useOnSelectDiory'
import { useLinkDiories } from '../tools/actions/linkDiories'
import { useMapSelectedDiory } from '../tools/utils/useMapSelectedDiory'
import { useToggleContent } from '../content/utils/useToggleContent'
import { useGoSide } from '../navigation/utils/useGoSide'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'
import { DiographNavigation } from './DiographNavigation'
import { useDiograph } from './utils/useDiograph'

export const Diograph = () => {
  useGenerateDiographEffect()

  const { diograph } = useDiograph()
  const { storyKey } = useSelector((state) => state.navigation)
  const { story, memories } = getStoryDiories(storyKey, diograph)

  const { context, stories, contexts } = useStoryContextDiories(diograph)

  const { forward = [] } = useSelector((state) => state.navigation)
  const { goLeft, goRight } = useGoSide(story, stories)
  const { mapSelectedDiory } = useMapSelectedDiory()
  return (
    <>
      <DiographNavigation
        story={story}
        stories={stories}
        context={context}
        contexts={contexts}
        onClick={useOnSelectStory()}
      />
      <Pane height="100%" position="relative">
        <NavigationToSide left onClick={goLeft} />
        <DiographView
          scrollIntoViewId={forward[0]}
          story={story}
          memories={memories.map(mapSelectedDiory)}
          onStoryClick={useToggleContent()}
          onMemoryClick={useOnSelectStory()}
          onSelect={useOnSelectDiory()}
          onDrop={useLinkDiories()}
        />
        <NavigationToSide right onClick={goRight} />
      </Pane>
    </>
  )
}
