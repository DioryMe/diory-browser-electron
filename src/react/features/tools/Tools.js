import React from 'react'
import { useSelector } from 'react-redux'

import { CreateDioryTool } from './actions/createDiory/CreateDioryTool'
import { UpdateTool } from './actions/update/UpdateTool'
import { DeleteDioriesTool } from './actions/deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './actions/deleteLinks/DeleteLinksTool'
import { TakeToHomeTool } from './actions/takeToDiory/TakeToDioryTool'

export const Tools = () => {
  const { isDiory } = useSelector((state) => state.diograph)
  return isDiory ? (
    <>
      <UpdateTool />
      <CreateDioryTool />
      <DeleteDioriesTool />
      <DeleteLinksTool />
    </>
  ) : (
    <>
      <TakeToHomeTool />
    </>
  )
}
