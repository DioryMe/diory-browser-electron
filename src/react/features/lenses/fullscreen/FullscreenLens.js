import React from 'react'
import Diory from '../../../components/diories/Diory'
import { useFocus } from '../../diograph/hooks'

const FullscreenLens = () => {
  const { diory } = useFocus()
  const fullScreenDiory = {
    ...diory,
    style: {
      ...(diory && diory.style),
      image: {
        ...(diory.style && diory.style.image),
        backgroundSize: 'contain',
        backgroundColor: 'black',
      },
    },
  }
  return <Diory diory={fullScreenDiory} height="100%" />
}

export default FullscreenLens
