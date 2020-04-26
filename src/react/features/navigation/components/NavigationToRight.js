import React from 'react'
import { useGoSide } from '../hooks'
import NavigationSideways from './NavigationSideways'

const NavigationToRight = () => {
  const { goRight } = useGoSide()
  return !goRight ? null : <NavigationSideways right onClick={goRight} />
}

export default NavigationToRight
