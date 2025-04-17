import React from 'react'

import { useSidebarData } from './utils/useSidebarData'
import { useKey } from './utils/useKey'

import HandView from './components/HandView'

export const HandSideBar = () => {
  const handKey = useKey('hand')
  return <HandView {...useSidebarData(handKey)} />
}
