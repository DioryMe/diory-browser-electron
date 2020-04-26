import React from 'react'
import { useGoSide } from '../hooks'
import NavigationSideways from './NavigationSideways'

const NavigationToLeft = () => {
  const { goLeft } = useGoSide()
  return !goLeft ? null : <NavigationSideways left onClick={goLeft} />
}

export default NavigationToLeft
