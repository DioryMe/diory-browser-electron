import React from 'react'

import { useSidebarData } from '../sideBar/utils/useSidebarData'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'
import { useStoryDiories } from '../diograph/utils/useDiories'

import { HandView } from './components/HandView'
import { useInitialiseDiory } from '../diograph/utils/useInitialiseDiory'

export const Hand = () => {
  const storyKey = useHomeDiographKey('hand')
  const { story, memories } = useStoryDiories({ storyKey })

  useInitialiseDiory('hand')

  const sideBarData = useSidebarData({ story, memories })
  return <HandView {...sideBarData} />
}
