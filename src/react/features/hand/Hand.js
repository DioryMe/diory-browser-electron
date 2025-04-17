import React from 'react'
import { useSelector } from 'react-redux'

import { useSidebarData } from '../sideBar/utils/useSidebarData'
import { useHomeDiographKey } from '../home/utils/useHomeDiographKey'

import { HandView } from './components/HandView'

export const Hand = () => {
  const handKey = useHomeDiographKey('hand')
  const sideBarData = useSidebarData(handKey)
  const { selectedLensId } = useSelector((store) => store.lenses)
  return selectedLensId ? null : <HandView {...sideBarData} />
}
