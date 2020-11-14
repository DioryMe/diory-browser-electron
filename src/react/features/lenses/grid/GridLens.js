import React from 'react'

import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'

import Grid from '../../../components/Grid'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  useCreateTool()

  return ({
    onClick: ({ diory }) => {
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
  })
}

const GridLens = ({ diory, diorys }) => <Grid diory={diory} diorys={diorys} {...useTools()} />

export default GridLens
