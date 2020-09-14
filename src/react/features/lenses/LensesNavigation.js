import React from 'react'
import LensesBar from '../../components/LensesBar'
import { useStore } from '../../store'
import { useLensesBar } from './useLensesBar'

const LensesNavigation = (props) => {
  const [{ roomId }] = useStore((state) => state.navigation)
  const { lenses } = useLensesBar()
  return !roomId ? null : <LensesBar lenses={lenses} {...props} />
}

export default LensesNavigation
