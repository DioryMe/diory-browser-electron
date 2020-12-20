import React from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { useCreateTool } from '../../tools/create'
import { useDeleteTool } from '../../tools/delete'
import { useFocusTool } from '../../tools/focus'
import { useUpdateTool } from '../../tools/update'

import { activateFilter, setFilter } from '../../filters/actions'
import { createLink } from '../../diograph/actions'

import GridView from './GridView'

const useTools = () => {
  const focusDiory = useFocusTool()
  const deleteDiory = useDeleteTool()
  const updateDiory = useUpdateTool()
  useCreateTool()

  const { dispatch } = useDispatchActions()
  return {
    onClick: ({ diory }) => {
      dispatch(activateFilter({ grid: true }))
      focusDiory(diory)
      deleteDiory(diory)
      updateDiory(diory)
    },
    onDrop: ({ diory, link }) => {
      dispatch(createLink(diory, link))
    },
    onZoom: (zoom) => dispatch(setFilter({ grid: zoom })),
  }
}

const GridLens = ({ diory, diorys }) => <GridView diory={diory} diorys={diorys} {...useTools()} />

GridLens.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
}

export default GridLens
