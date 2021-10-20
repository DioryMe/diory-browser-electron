import PropTypes from 'prop-types'
import React from 'react'

import { useStore } from '../../store'
import { getUntrackedDiory, convertRelativePath } from '../../utils'

import Fullscreen from '../../components/Fullscreen'
import { useStory } from '../diograph/hooks'
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

const LensesView = ({ diory, memories, selectedLensId }) => {
  console.log('Diorys in lens', memories.length)
  const { Lens } = lenses[selectedLensId]

  return diory ? (
    <Fullscreen marginTop={48} zIndex={-1}>
      <Lens diory={diory} memories={memories} />
    </Fullscreen>
  ) : null
}

LensesView.propTypes = {
  diory: PropTypes.object.isRequired,
  memories: PropTypes.array.isRequired,
  selectedLensId: PropTypes.string.isRequired,
}

const Lenses = () => {
  const { filterIsActive } = useFilterIsActive()
  const focusDiorys = useStory()
  const filteredDiorys = useFilteredDiorys()
  const { diory, memories } = filterIsActive ? filteredDiorys : focusDiorys
  const [{ selectedLensId }] = useStore((state) => state.lenses)

  const [{ connections }] = useStore((state) => state.connectors)
  const preparedDiory = diory && prepareDiory(diory, connections)
  const preparedDiorys = memories.map((diory) => prepareDiory(diory, connections))

  return (
    <LensesView diory={preparedDiory} memories={preparedDiorys} selectedLensId={selectedLensId} />
  )
}

export default Lenses
