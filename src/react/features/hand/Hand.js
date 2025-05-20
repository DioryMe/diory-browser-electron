import React from 'react'

import { useSidebarData } from '../sideBar/utils/useSidebarData'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'

import { HandView } from './components/HandView'

// TODO initialise hand to diograph

export const Hand = () => {
  const handKey = useHomeDiographKey('hand')
  const sideBarData = useSidebarData(handKey)
  return <HandView {...sideBarData} />
}
