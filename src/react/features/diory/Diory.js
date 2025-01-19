import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useDiograph } from './useDiograph'

import { useToggleContent } from '../content/useToggleContent'
import { useDiographGoSide } from '../../components/diograph/useDiographGoSide'

import { useDeleteTool } from './tools/delete'
import { useStoryTool } from './tools/story'
import { useUpdateTool } from './tools/update'

import { createLink } from './diographActions'
import { goSide } from './navigationActions'

import DiographView from '../../components/diograph/DiographView'
import NavigationToSide from '../../components/NavigationToSide'
import CreateTool from './tools/create/CreateTool'
import UpdateTool from './tools/update/UpdateTool'
import DeleteTool from './tools/delete/DeleteTool'

export const useDiographTools = () => {
  const { forward = [] } = useSelector((state) => state.navigation)

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
  const { goLeft, goRight } = useDiographGoSide(diograph, goSide)

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
