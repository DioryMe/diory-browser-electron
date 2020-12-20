import React from 'react'
import LensesBarView from './LensesBarView'
import { useLensesBar } from './useLensesBar'

const LensesBar = () => {
  const { lenses } = useLensesBar()
  return <LensesBarView lenses={lenses} />
}

export default LensesBar
