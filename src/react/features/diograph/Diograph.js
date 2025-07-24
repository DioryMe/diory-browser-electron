import React from 'react'
import { useSelector } from 'react-redux'
import { Pane } from 'evergreen-ui'

import { useDiographEffect } from './useDiographEffect'
import { useStoryDiories } from './utils/useDiories'

import { useSelectStory } from '../tools/selectStory'
import { useSelectDiory } from '../tools/useSelectDiory'
import { useLinkDiories } from '../tools/linkDiories/useLinkDiories'

import { useToggleContent } from '../content/useToggleContent'
import { useGoSide } from '../navigation/utils/useGoSide'
import { useNavigation } from '../navigation/useNavigation'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'

export const useDiographTools = () => {
  const { forward = [] } = useNavigation('diory')

  const { selectStory } = useSelectStory()
  const { selectDiory } = useSelectDiory()
  const { linkDiories } = useLinkDiories()

  const { toggleContent } = useToggleContent()

  return {
    scrollIntoViewId: forward[0],
    onStoryClick: ({ diory }) => {
      toggleContent()
      selectDiory(diory)
    },
    onMemoryClick: ({ diory }) => {
      selectStory(diory)
      selectDiory(diory)
    },
    onSelect: ({ diory }) => {
      selectDiory(diory, true)
    },
    onDrop: ({ diory, draggedDiory }) => {
      linkDiories(diory, draggedDiory)
    },
  }
}

const useMapSelectedDiories = () => {
  const { selectedDiories } = useSelector((state) => state.tools)
  const { open } = useSelector((state) => state.buttons)
  return {
    mapSelected: (diory) => ({ ...diory, selected: open ? !!selectedDiories[diory.key] : null }),
  }
}

export const Diograph = () => {
  useDiographEffect()

  const { story, memories } = useStoryDiories()
  const { goLeft, goRight } = useGoSide()
  const { mapSelected } = useMapSelectedDiories()

  return (
    <Pane height="100%" position="relative">
      <NavigationToSide left onClick={goLeft} />
      <DiographView story={story} memories={memories.map(mapSelected)} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </Pane>
  )
}
