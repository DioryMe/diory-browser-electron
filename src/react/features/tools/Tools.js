import React from 'react'

import { useImportTool } from './import'

import CreateTool from './create/CreateTool'
import UpdateTool from './update/UpdateTool'
import DeleteTool from './delete/DeleteTool'

const Tools = () => {
  useImportTool()

  return (
    <>
      <CreateTool />
      <UpdateTool />
      <DeleteTool />
    </>
  )
}

export default Tools
