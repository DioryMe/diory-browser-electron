import React from 'react'

import { useSelector } from '../../../store'
import { useHand } from './useHand'

import HandView from './HandView'

const HandTool = () => {
  const { open } = useSelector((state) => state.buttons)
  const hand = useHand()
  return open ? <HandView {...hand} /> : null
}

export default HandTool
