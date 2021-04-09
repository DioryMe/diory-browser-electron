import React from 'react'
import DataAwareDiory from '../../../components/diories/DataAwareDiory'
import { useFocus } from '../../diograph/hooks'

const defaultStyle = {
  image: {
    backgroundSize: 'contain',
    backgroundColor: 'black',
  },
}

// TODO: To diory utils
function addStyle({ style = {}, ...props }, addedStyle) {
  return {
    ...props,
    style: {
      ...style,
      ...addedStyle,
      image: {
        ...(style && style.image),
        ...addedStyle.image,
      },
    },
  }
}

const FullscreenLens = () => {
  const { diory } = useFocus()
  return <DataAwareDiory diory={addStyle(diory, defaultStyle)} height="100%" />
}

export default FullscreenLens
