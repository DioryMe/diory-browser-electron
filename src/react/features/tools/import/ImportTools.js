import React from 'react'

import { useSelector } from '../../../store'

import { IMPORT_TOOLS } from './buttons'

import ImportToolButtons from './ImportToolButtons'
import FolderImportTool from '../folder/FolderImportTool'
import CreateTool from '../create/CreateTool'

const ImportTools = () => {
  const { active } = useSelector((state) => state.buttons)
  const { selectedTool } = useSelector((state) => state.tools)

  if (IMPORT_TOOLS !== active) {
    return null
  }

  switch (selectedTool) {
    case 'FOLDER_IMPORT': return <FolderImportTool />
    case 'CREATE_TOOL': return <CreateTool />
    default: return <ImportToolButtons />
  }
}

export default ImportTools
