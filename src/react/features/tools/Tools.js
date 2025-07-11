import React from 'react'

import { useCreateLinkTool } from './addDiograph'

import { CreateDioryTool } from './createDiory/CreateDioryTool'
import { UpdateTool } from './update/UpdateTool'
import { DeleteDioriesTool } from './deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './deleteLinks/DeleteLinksTool'

export const Tools = () => {
  useCreateLinkTool()

  return (
    <>
      <UpdateTool />
      <CreateDioryTool />
      <DeleteDioriesTool />
      <DeleteLinksTool />
    </>
  )
}
