import React from 'react'

import { useStore } from '../../../store'
import { useHand } from './useHand'

import HandView from './HandView'

const Hands = () => {
  const [{ open }] = useStore((state) => state.buttons)
  const { diorys } = useHand()
  return open ? <HandView diorys={diorys} /> : null
}

export default Hands
