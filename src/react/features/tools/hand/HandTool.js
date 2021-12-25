import React from 'react'

import { useSelector } from '../../../store'
import { useHand } from './useHand'

import HandView from './HandView'

const HandTool = () => {
  const { open } = useSelector((state) => state.buttons)
  const { selectedLensId } = useSelector((state) => state.lenses)
  const props = useHand()
  return open && selectedLensId === 'grid' ? <HandView {...props} /> : null
}

export default HandTool
