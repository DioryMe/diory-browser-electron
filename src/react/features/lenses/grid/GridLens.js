import React from 'react'

import Grid from '../../../components/Grid'
import CreateTool from '../../tools/create/CreateTool'
import DeleteTool from '../../tools/delete/DeleteTool'
import UpdateTool from '../../tools/update/UpdateTool'

const GridLens = ({ diory, diorys, onClick }) => (
  <>
    <Grid diory={diory} diorys={diorys} onClick={onClick} />
    <CreateTool />
    <DeleteTool />
    <UpdateTool />
  </>
)

export default GridLens
