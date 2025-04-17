import React from 'react'

import { useCreateLinkTool } from './createLink'

import { CreateTool } from './create'
import { UpdateTool } from './update'
import { DeleteTool } from './delete'

export const Tools = () => {
  useCreateLinkTool()

  return (
    <>
      <CreateTool />
      <UpdateTool />
      <DeleteTool />
    </>
  )
}
