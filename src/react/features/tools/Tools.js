import React from 'react'
import { useSelector } from 'react-redux'

import { CreateDioryTool } from './createDiory/CreateDioryTool'
import { UpdateTool } from './update/UpdateTool'
import { DeleteDioriesTool } from './deleteDiories/DeleteDioriesTool'
import { DeleteLinksTool } from './updateLinks/DeleteLinksTool'

export const Tools = () => {
  const { isDiory } = useSelector((state) => state.diograph)
  return isDiory ? (
    <>
      <UpdateTool />
      <CreateDioryTool />
      <DeleteDioriesTool />
      <DeleteLinksTool />
    </>
  ) : null
}
