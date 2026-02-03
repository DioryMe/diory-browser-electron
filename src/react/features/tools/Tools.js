import React from 'react'
import { useSelector } from 'react-redux'

import { CreateDioryTool } from './actions/createDiory/CreateDioryTool'
import { UpdateDioryTool } from './actions/updateDiory/UpdateDioryTool'
import { DeleteDioriesTool } from './actions/deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './actions/deleteLinks/DeleteLinksTool'
import { TakeToHomeTool } from './actions/takeToDiory/TakeToDioryTool'

export const Tools = () => {
  const { isDiory } = useSelector((state) => state.diograph)
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
