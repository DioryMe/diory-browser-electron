import React from 'react'

import NavigationTopBar from '../../components/NavigationTopBar'
import NavigationButtons from './NavigationButtons'
import NavigationToSide from '../../components/NavigationToSide'
import { useGoSide } from './useGoSide'

const Navigation = () => {
  const { goLeft, goRight } = useGoSide()
  return (
    <>
      <NavigationTopBar>
        <NavigationButtons display="flex" alignSelf="center" />
      </NavigationTopBar>
      <NavigationToSide left onClick={goLeft} />
      <NavigationToSide right onClick={goRight} />
    </>
  )
}

export default Navigation
