import React from 'react'
import { useButtons } from '../../../../buttons'

import { buttons } from './buttons'
import { useCreateLocation } from './useCreateLocation'

const CreateLocation = ({ map, diory, activeButton, actions }) => {
  useButtons(buttons)
  useCreateLocation(map, diory, activeButton, actions)

  return null
}

export default CreateLocation
