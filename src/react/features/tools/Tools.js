import React from 'react'

import { CreateDioryTool } from './actions/createDiory/CreateDioryTool'
import { UpdateDioryTool } from './actions/updateDiory/UpdateDioryTool'
import { DeleteDioriesTool } from './actions/deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './actions/deleteLinks/DeleteLinksTool'
import { TakeToHomeTool } from './actions/takeToDiory/TakeToDioryTool'

export const Tools = ({ isDiory }) => {
  return isDiory ? (
    <>
      <UpdateDioryTool />
      <CreateDioryTool />
      <DeleteDioriesTool />
      <DeleteLinksTool />
    </>
  ) : (
    <TakeToHomeTool />
  )
}
