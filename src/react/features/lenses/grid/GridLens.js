import React from 'react'

import GridView from './GridView'
import CreateTool from './tools/create/CreateTool'
import UpdateTool from './tools/update/UpdateTool'

const GridLens = () => {

  return <>
    <GridView />
    <CreateTool />
    <UpdateTool />
  </>
}

export default GridLens
