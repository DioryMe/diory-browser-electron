import React from 'react'
import { useLeft } from './hooks'
import NavigationSideways from './NavigationSideways'

const NavigationToLeft = () => {
  const { onClick } = useLeft()
  return !onClick ? null : (
    <NavigationSideways left onClick={onClick} />
  )
}

export default NavigationToLeft
