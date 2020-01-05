import React from 'react'
import { useRight } from './hooks'
import NavigationSideways from './NavigationSideways'

const NavigationToRight = () => {
  const { onClick } = useRight()
  return !onClick ? null : <NavigationSideways right onClick={onClick} />
}

export default NavigationToRight
