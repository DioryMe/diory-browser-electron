import React from 'react'
import LensesBar from '../../../components/LensesBar'
import { useFocusDiory } from '../../diograph/hooks'
import { useLenses } from '../../lenses/useLenses'

const NavigationLenses = (props) => {
  const { diory } = useFocusDiory()
  const { lenses } = useLenses()
  return !diory ? null : <LensesBar lenses={lenses} {...props} />
}

export default NavigationLenses
