import React from 'react'
import { useButtons } from '../../../../buttons'

import { buttons } from './buttons'
import { useUpdateLocation } from './useUpdateLocation'

const UpdateLocation = ({ map, activeButton, actions }) => {
  useButtons(buttons)
  useUpdateLocation(map, activeButton, actions)

  return null
}

export default UpdateLocation
