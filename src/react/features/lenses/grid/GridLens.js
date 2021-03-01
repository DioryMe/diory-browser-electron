import React from 'react'

import { useDispatchActions } from '../../../store'

import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'

import { createLink } from '../../diograph/actions'

import LensContainer from '../components/LensContainer'
import { useLensDiorys } from '../hooks/useLens'
import GridView from './GridView'

const GRID_LENS_ID = 'grid'

const gridDiory = {
  id: GRID_LENS_ID,
  text: 'Grid',
  image: 'grid-view',
}

const useToolActions = () => {
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

const SelectedGridLens = () => {
  const { diory, diorys } = useLensDiorys()
  return <GridView diory={diory} diorys={diorys} {...useToolActions()} />
}

const GridLens = () => (
  <LensContainer lensDiory={gridDiory}>
    <SelectedGridLens />
  </LensContainer>
)

export default GridLens
