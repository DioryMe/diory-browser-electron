import React from 'react'

import { useDispatchActions } from '../../../store'
import { useDiograph } from '../../diograph/useDiograph'

import { useLens } from '../useLens'
import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'
import { usePlayTool } from '../../tools/play/usePlayTool'

import { createLink } from '../../diograph/actions'
import { selectContext } from '../../navigation/actions'

import GridView from './GridView'

import button from './diory'

import { withLensContainer } from '../LensContainer'
import { useOpenTool } from '../../tools/open/useOpenTool'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()

  useCreateTool()
  useOpenTool()

  const { context } = useDiograph()
  const { playRef } = usePlayTool()
  const { dispatch } = useDispatchActions()

  return {
    playRef,
    onContextClick: ({ diory }) => {
      if (diory.id === context.id) {
        focusDiory(diory)
      } else {
        dispatch(selectContext(diory))
      }
    },
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
