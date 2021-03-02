import PropTypes from 'prop-types'
import React from 'react'

import { useStore } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import { useFocus } from '../diograph/hooks'
import { useFilterIsActive } from '../filters/hooks/useFilterIsActive'
import { useFilteredDiorys } from '../filters/useFilteredDiorys'

import fullscreen from './fullscreen'
import grid from './grid'
import map from './map'
import timeline from './timeline'

export const lenses = {
  grid,
  map,
  timeline,
  fullscreen,
}

const LensesView = ({ diory, diorys, selectedLensId }) => {
  console.log('Diorys in lens', diorys.length)
  const { Lens } = lenses[selectedLensId]

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens diory={diory} diorys={diorys} />
    </Fullscreen>
  ) : null
}

LensesView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  selectedLensId: PropTypes.string.isRequired,
}

const Lenses = () => {
  const { filterIsActive } = useFilterIsActive()
  const focusDiorys = useFocus()
  const filteredDiorys = useFilteredDiorys()
  const { diory, diorys } = filterIsActive ? filteredDiorys : focusDiorys
  const [{ selectedLensId }] = useStore((state) => state.lenses)

  return <LensesView diory={diory} diorys={diorys} selectedLensId={selectedLensId} />
}

export default Lenses
