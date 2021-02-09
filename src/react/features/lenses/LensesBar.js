import React from 'react'
import LensesBarView from './LensesBarView'
import { useLensesBar } from './useLensesBar'

const LensesBar = () => {
  return <LensesBarView {...useLensesBar()} />
}

export default LensesBar
