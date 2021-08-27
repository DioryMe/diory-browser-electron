import React from 'react'

import { useFocus } from '../../diograph/hooks'
import { useDispatchActions } from '../../../store'

import { selectLens } from '../actions'

import Fullscreen from '../../../components/Fullscreen'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import CloseButton from '../../../components/CloseButton'

const useFullscreenLens = () => {
  const { dispatch } = useDispatchActions()

  return {
    onClick: () => dispatch(selectLens('grid')),
  }
}

const FullscreenLens = () => {
  const { diory } = useFocus()
  const { onClick } = useFullscreenLens()
  return (
    <Fullscreen zIndex={10000}>
      <DataAwareDiory diory={diory} />
      <CloseButton onClick={onClick} />
    </Fullscreen>
  )
}

export default FullscreenLens
