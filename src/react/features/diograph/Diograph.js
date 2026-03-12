import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useGenerateDiographEffect } from './useGenerateDiographEffect'

import { useStoryContextDiories } from './utils/useContextDiories'

import { useLinkDiories } from '../tools/actions/linkDiories'
import { useToggleContent } from '../content/utils/useToggleContent'
import { useGoSide } from '../navigation/utils/useGoSide'
import { useOnCheckboxClick } from '../tools/useOnCheckboxClick'
import { useOnDioryClick } from '../tools/useOnDioryClick'

import { useMapSelectedDiory } from '../tools/utils/useMapSelectedDiory'

import { getStoryDiories } from './utils/getStoryDiories'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'

export const Diograph = ({ diograph }) => {
  useGenerateDiographEffect()

  const { storyKey } = useSelector((state) => state.navigation)
  const { story, memories } = getStoryDiories(storyKey, diograph)

  const { stories } = useStoryContextDiories(diograph)

  const { forward = [] } = useSelector((state) => state.navigation)
  const { goLeft, goRight } = useGoSide(story, stories)
  const { mapSelectedDiory } = useMapSelectedDiory()
  return (
    <Pane height="100%" position="relative">
      <NavigationToSide left onClick={goLeft} />
      <DiographView
        scrollIntoViewId={forward[0]}
        story={story}
        memories={memories.map(mapSelectedDiory)}
        onStoryClick={useToggleContent()}
        onMemoryClick={useOnDioryClick()}
        onSelect={useOnCheckboxClick({ diograph })}
        onDrop={useLinkDiories()}
      />
      <NavigationToSide right onClick={goRight} />
    </Pane>
  )
}
