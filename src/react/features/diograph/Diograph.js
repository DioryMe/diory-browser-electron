import React from 'react'
import { Panel } from 'react-resizable-panels'

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

import NavigationToSide from './components/NavigationToSide'
import DiographView from './components/DiographView'

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
    onDrop: ({ diory, draggedDiory }) => {
      dispatch(createLink(diory, draggedDiory))
    },
  }
}

export const Diograph = () => {
  useDiographEffect()

  const diograph = useDiories()
  const { goLeft, goRight } = useGoSide()

  return (
    <Panel minSize={20} style={{ position: 'relative' }}>
      <NavigationToSide left onClick={goLeft} />
      <DiographView {...diograph} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </Panel>
  )
}
