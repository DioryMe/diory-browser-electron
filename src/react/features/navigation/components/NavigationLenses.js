import React from 'react'
import LensesBar from '../../lenses/LensesBar'
import { useFocusDiory } from '../../diograph/hooks'

const NavigationLenses = () => {
  const { diory } = useFocusDiory()
  return !diory ? null : <LensesBar />
}

export default NavigationLenses
