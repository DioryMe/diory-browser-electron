import React from 'react'

import { useHand } from './useHand'

import HandView from './HandView'

const HandTool = () => {
  const props = useHand()
  return <HandView {...props} />
}

export default HandTool
