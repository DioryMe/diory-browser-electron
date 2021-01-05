import React from 'react'
import LensesBar from '../../lenses/LensesBar'
import { useFocus } from '../../diograph/hooks'

const NavigationLenses = () => {
  const { diory } = useFocus()
  return !diory ? null : <LensesBar />
}

export default NavigationLenses
