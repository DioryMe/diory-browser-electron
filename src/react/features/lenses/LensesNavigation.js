import React from 'react'
import LensesBar from '../../components/LensesBar'
import { useFocusDiory } from '../room/hooks'
import { useLensesBar } from './useLensesBar'

const LensesNavigation = (props) => {
  const { diory } = useFocusDiory()
  const { lenses } = useLensesBar()
  return !diory ? null : <LensesBar lenses={lenses} {...props} />
}

export default LensesNavigation
