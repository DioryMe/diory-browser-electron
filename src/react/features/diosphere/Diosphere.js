import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useDiographGoSide } from '../../components/diograph/useDiographGoSide'
import { useDiosphere } from './useDiosphere'

import { goSide, selectStory } from './diosphereActions'

import DiographView from '../../components/diograph/DiographView'
import NavigationToSide from '../../components/NavigationToSide'

export const useDiographTools = () => {
  const { forward = [] } = useSelector((state) => state.diosphere)

  const { dispatch } = useDispatchActions()
  return {
    scrollIntoViewId: forward[0],
    onMemoryClick: ({ diory }) => {
      dispatch(selectStory(diory))
    },
  }
}

const Diosphere = () => {
  const diosphere = useDiosphere()
  const { goLeft, goRight } = useDiographGoSide(diosphere, goSide)
  return (
    <>
      <NavigationToSide left onClick={goLeft} />
      <DiographView {...diosphere} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Diosphere
