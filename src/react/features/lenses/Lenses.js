import PropTypes from 'prop-types'
import React from 'react'

import { useStore } from '../../store'
import { getUntrackedDiory, convertRelativePath } from '../../utils'

import { useFocus, useLinkDiory } from '../diograph/hooks'
import { useFilterIsActive } from '../filters/hooks/useFilterIsActive'
import { useFilteredDiorys } from '../filters/useFilteredDiorys'

import fullscreen from './fullscreen'
import grid from './grid'
import map from './map'
import timeline from './timeline'

const prepareDiory = (diory, connections) => {
  const preparedDiory = getUntrackedDiory(diory)
  if (preparedDiory) {
    preparedDiory.image = convertRelativePath(preparedDiory.image, connections)
    if (preparedDiory.data) {
      preparedDiory.data[0].contentUrl = convertRelativePath(
        preparedDiory.data[0].contentUrl,
        connections
      )
    }
  }
  return preparedDiory
}

export const lenses = {
  grid,
  map,
  timeline,
  fullscreen,
}

const LensesView = ({ diory, diorys, selectedDioryId, selectedLensId }) => {
  console.log('Diorys in lens', diorys.length)
  const { Lens } = lenses[selectedLensId]

  return diory ? <Lens diory={diory} diorys={diorys} selectedDioryId={selectedDioryId} /> : null
}

LensesView.propTypes = {
  diory: PropTypes.object.isRequired,
  diorys: PropTypes.array.isRequired,
  selectedLensId: PropTypes.string.isRequired,
  selectedDioryId: PropTypes.string,
}

const Lenses = () => {
  const { filterIsActive } = useFilterIsActive()
  const focusDiorys = useFocus()
  const { diory: selectedDiory } = useLinkDiory()
  const selectedDioryId = selectedDiory ? selectedDiory.id : undefined
  const filteredDiorys = useFilteredDiorys()
  const { diory, diorys } = filterIsActive ? filteredDiorys : focusDiorys
  const [{ selectedLensId }] = useStore((state) => state.lenses)

  const [{ connections }] = useStore((state) => state.connectors)
  const preparedDiory = diory && prepareDiory(diory, connections)
  const preparedDiorys = diorys.map((diory) => prepareDiory(diory, connections))

  return (
    <LensesView
      diory={preparedDiory}
      diorys={preparedDiorys}
      selectedDioryId={selectedDioryId}
      selectedLensId={selectedLensId}
    />
  )
}

export default Lenses
