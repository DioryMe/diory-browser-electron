import React from 'react'

import { useStore } from '../../../store'
import { useHand } from './useHand'

import HandView from './HandView'

const HandTool = () => {
  const [{ open }] = useStore((state) => state.buttons)
  const [{ selectedLensId }] = useStore((state) => state.lenses)
  const props = useHand()
  return open && selectedLensId === 'grid' ? <HandView {...props} /> : null
}

export default HandTool
