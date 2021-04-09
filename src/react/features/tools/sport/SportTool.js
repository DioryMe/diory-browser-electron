import React from 'react'

import { useButtons } from '../../buttons'
import { useSportTool } from './useSportTool'

import { buttons } from './buttons'

const SportTool = () => {
  useButtons(buttons)
  useSportTool()

  return null
}

export default SportTool
