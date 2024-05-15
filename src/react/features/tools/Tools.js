import React from 'react'

import { useGenerateTool } from './generate'
import { useImportTools } from './import/useImportTools'

import ImportTools from './import/ImportTools'
import UpdateTool from './update/UpdateTool'
import DeleteTool from './delete/DeleteTool'

const Tools = () => {
  useGenerateTool()
  useImportTools()

  return (
    <>
      <ImportTools />
      <UpdateTool />
      <DeleteTool />
    </>
  )
}

export default Tools
