import React from 'react'

import { useDispatchActions } from '../../../store'

import { useLens } from '../useLens'
import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'

import { createLink } from '../../diograph/actions'

import { withLensContainer } from '../LensContainer'
import GridView from './GridView'

import button from './diory'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  useCreateTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ droppedId, draggedId }) => {
      dispatch(createLink({ id: droppedId }, { id: draggedId }))
    },
  }
}

const GridLens = () => <GridView {...useLens()} {...useTools()} />

export default withLensContainer('grid', button)(GridLens)
