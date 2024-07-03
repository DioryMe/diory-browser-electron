import React from 'react'

import { useHand } from './useHand'

import HandView from './HandView'

export const Hand = () => <HandView {...useHand()} />
