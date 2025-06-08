import React from 'react'
import { useSelector } from 'react-redux'

import { useDispatchActions } from '../../store'
import { useDiographEffect } from './useDiographEffect'
import { useDiories } from './utils/useDiories'

import { useToggleContent } from '../content/useToggleContent'
import { useGoSide } from '../navigation/utils/useGoSide'
import { useNavigation } from '../navigation/useNavigation'

import { useDeleteTool } from '../tools/delete'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'

import { createLink } from './diographActions'
import { selectDiory } from '../navigation/navigationActions'

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'
import { Pane } from 'evergreen-ui'

export const useDiographTools = () => {
  const { forward = [] } = useNavigation('diory')

  const selectStory = useStoryTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  const { toggleContent } = useToggleContent()

  const { dispatch } = useDispatchActions()
  return {
    scrollIntoViewId: forward[0],
    onStoryClick: ({ diory }) => {
      toggleContent()
      deleteDiory(diory)
      updateDiory(diory)
    },
    onMemoryClick: ({ diory }) => {
      selectStory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onSelect: ({ key }) => {
      dispatch(selectDiory({ key }))
    },
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
  }
}

const useSelectedDiories = () => {
  const { selectedDiories } = useSelector((state) => state.navigation)
  const { open } = useSelector((state) => state.buttons)
  return {
    mapSelected: (diory) => ({ ...diory, selected: open ? !!selectedDiories[diory.key] : null }),
  }
}

export const Diograph = () => {
  useDiographEffect()

  const { story, memories } = useDiories()
  const { goLeft, goRight } = useGoSide()
  const { mapSelected } = useSelectedDiories()

  return (
    <Pane height="100%" position="relative">
      <NavigationToSide left onClick={goLeft} />
      <DiographView story={story} memories={memories.map(mapSelected)} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </Pane>
  )
}
