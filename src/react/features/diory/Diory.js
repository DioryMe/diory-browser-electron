import React from 'react'

import { useDispatchActions } from '../../store'
import { useDiograph } from '../diograph/useDiograph'

import { useToggleContent } from '../content/useToggleContent'
import { useGoSide } from '../navigation/useGoSide'
import { useNavigation } from '../navigation/useNavigation'

import { useDeleteTool } from '../tools/delete'
import { useStoryTool } from '../tools/story'
import { useUpdateTool } from '../tools/update'

import { createLink } from '../diograph/diographActions'

import DiographView from '../../components/diograph/DiographView'
import NavigationToSide from '../../components/NavigationToSide'
import CreateTool from '../tools/create/CreateTool'
import UpdateTool from '../tools/update/UpdateTool'
import DeleteTool from '../tools/delete/DeleteTool'

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

const Diory = () => {
  const diograph = useDiograph()
  const { goLeft, goRight } = useGoSide()

  return (
    <>
      <NavigationToSide left onClick={goLeft} />
      <DiographView {...diograph} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
      <CreateTool />
      <UpdateTool />
      <DeleteTool />
    </>
  )
}

export default Diory
