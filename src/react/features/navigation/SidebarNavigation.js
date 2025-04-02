import React from 'react'

import { useSelector } from 'react-redux'
import { useDiographData } from '../diograph/utils/useDiographData'
import { useDispatchActions } from '../../store'
import { selectStory } from './navigationActions'

import { DiographLinks } from '../../components/diograph/DiographLinks'

const useFavorites = () => {
  const { diograph } = useSelector((state) => state.diograph)
  const { address } = useSelector((state) => state.home)
  const { memories } = useDiographData({ storyKey: `${address}favorites` }, diograph)
  return memories
}

export const SidebarNavigation = () => {
  const { dispatchAction } = useDispatchActions()
  return <DiographLinks links={useFavorites()} onClick={dispatchAction(selectStory)} />
}
