import React from 'react'
import LensesBarView from './LensesBarView'
import { useLensesBar } from './useLensesBar'

const LensesBar = () => <LensesBarView {...useLensesBar()} />

export default LensesBar
