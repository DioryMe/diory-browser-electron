import React from 'react'

import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

import { useSidePanelActions } from '../sidePanel/useSidePanelActions'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useDiories } from '../diograph/utils/useDiories'

import { HandView } from './components/HandView'

export const Hand = () => {
  useInitialiseDiory('hand')

  const handKey = useHomeDiographKey('hand')
  const handDiories = useDiories(handKey)
  const actions = useSidePanelActions(handDiories)

  return <HandView {...handDiories} {...actions} />
}
