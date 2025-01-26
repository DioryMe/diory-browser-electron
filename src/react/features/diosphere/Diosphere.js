import React from 'react'

import { useDispatchActions } from '../../store'
import { useGoSide } from '../navigation/useGoSide'

import { useDiograph } from '../diograph/useDiograph'
import { useNavigation } from '../navigation/useNavigation'
import { useGenerateDiographEffect } from './useGenerateDiographEffect'

import { selectStory } from '../navigation/navigationActions'

import DiographView from '../../components/diograph/DiographView'
import NavigationToSide from '../../components/NavigationToSide'

export const useDiographTools = () => {
  const { forward = [] } = useNavigation('diosphere')

  const { dispatch } = useDispatchActions()
  return {
    scrollIntoViewId: forward[0],
    onMemoryClick: ({ diory }) => {
      dispatch(selectStory(diory))
    },
  }
}

const Diosphere = () => {
  useGenerateDiographEffect()

  const diograph = useDiograph()
  const { goLeft, goRight } = useGoSide()
  return (
    <>
      <NavigationToSide left onClick={goLeft} />
      <DiographView {...diograph} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Diosphere
