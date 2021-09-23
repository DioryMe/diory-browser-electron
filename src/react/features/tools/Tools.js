import React from 'react'

import ImportTools from './import/ImportTools'
import UpdateTool from './update/UpdateTool'
import DeleteTool from './delete/DeleteTool'
import HandTool from './hand/HandTool'
import CreateTool from './create/CreateTool'
import FolderImportTool from './folder/FolderImportTool'

const Tools = () => (
  <>
    <ImportTools />
    <UpdateTool />
    <DeleteTool />
    <HandTool />
    <FolderImportTool />
    <CreateTool />
  </>
)

export default Tools
