import React from 'react'

import { useCreateDiory } from './useCreateDiory'

import UpdateView from '../update/UpdateView'

const CreateTool = () => {
  const createDiory = useCreateDiory()

  return <UpdateView title="Create diory" isShown onDone={createDiory} />
}

export default CreateTool
