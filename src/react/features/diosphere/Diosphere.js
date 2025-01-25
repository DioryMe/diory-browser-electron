import React from 'react'

import { useDispatchActions, useSelector } from '../../store'
import { useDiographGoSide } from '../../components/diograph/useDiographGoSide'
import { useDiograph } from '../home/useDiograph'

import { goSide, selectStory } from '../navigation/navigationActions'

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
  const diograph = useDiograph()
  const { goLeft, goRight } = useDiographGoSide(diograph, goSide)
  return (
    <>
      <NavigationToSide left onClick={goLeft} />
      <DiographView {...diograph} {...useDiographTools()} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Diosphere
