import React from 'react'
import { useButtons } from '../../../../buttons'

import { buttons } from './buttons'
import { useDeleteLocation } from './useDeleteLocation'

const DeleteLocation = ({ map, diory, activeButton, actions }) => {
  useButtons(buttons)
  useDeleteLocation(map, diory, activeButton, actions)

  return null
}

export default DeleteLocation
