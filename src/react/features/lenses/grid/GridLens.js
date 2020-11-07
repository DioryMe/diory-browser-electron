import React from 'react'

import { useGridLens } from './useGridLens'
import { useTools } from '../../tools/useTools'

import Grid from '../../../components/Grid'
import CreateTool from '../../tools/create/CreateTool'
import DeleteTool from '../../tools/delete/DeleteTool'
import UpdateTool from '../../tools/update/UpdateTool'

const GridLens = ({ diory, diorys, activeButton, actions, toolOnClick }) => {
  const onClick = activeButton ? toolOnClick : ({ diory }) => actions.setFocus({ focus: diory.id })
  return <>
    <Grid diory={diory} diorys={diorys} onClick={onClick} />
    <CreateTool />
    <DeleteTool />
    <UpdateTool />
  </>
}

export default GridLens
