import React from 'react'

import { useSidePanelData } from '../sidePanel/utils/useSidePanelData'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useStoryDiories } from '../diograph/utils/useDiories'

import { HandView } from './components/HandView'
import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

export const Hand = () => {
  const storyKey = useHomeDiographKey('hand')
  const { story, memories } = useStoryDiories({ storyKey })

  useInitialiseDiory('hand')

  const sidePanelData = useSidePanelData({ story, memories })
  return <HandView {...sidePanelData} />
}
