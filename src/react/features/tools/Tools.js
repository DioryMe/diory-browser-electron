import React from 'react'

import { CreateDioryTool } from './createDiory/CreateDioryTool'
import { UpdateTool } from './update/UpdateTool'
import { DeleteDioriesTool } from './deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './deleteLinks/DeleteLinksTool'

export const Tools = () => (
  <>
    <UpdateTool />
    <CreateDioryTool />
    <DeleteDioriesTool />
    <DeleteLinksTool />
  </>
)
