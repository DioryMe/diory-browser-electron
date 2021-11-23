import React from 'react'

import { useStore } from '../../../store'
import { useHand } from './useHand'

import HandView from './HandView'

const HandTool = () => {
  const [{ showSearchBar }] = useStore((state) => state.search)
  const props = useHand()
  return showSearchBar && <HandView {...props} />
}

export default HandTool
