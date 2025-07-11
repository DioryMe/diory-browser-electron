import React from 'react'

import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

import { useSidePanelActions } from '../sidePanel/useSidePanelActions'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useStoryDiories } from '../diograph/utils/useDiories'

import { HandView } from './components/HandView'

export const Hand = () => {
  useInitialiseDiory('hand')

  const storyKey = useHomeDiographKey('hand')
  const storyDiories = useStoryDiories({ storyKey })
  const actions = useSidePanelActions(storyDiories)

  return <HandView {...storyDiories} {...actions} />
}
