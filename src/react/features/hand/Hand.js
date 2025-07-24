import React from 'react'

import { useCreateHomeDiory } from '../home/utils/useCreateHomeDiory'

import { useSidePanelActions } from '../sidePanel/useSidePanelActions'
import { useHomeKey } from '../home/utils/useHomeKey'
import { useDiories } from '../diograph/utils/useDiories'

import { HandView } from './components/HandView'

export const Hand = () => {
  useCreateHomeDiory('hand')

  const handKey = useHomeKey('hand')
  const handDiories = useDiories(handKey)
  const actions = useSidePanelActions(handDiories)

  return <HandView {...handDiories} {...actions} />
}
