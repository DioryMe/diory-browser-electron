import React, { useContext } from 'react'
import LensContext from './LensContext'
import * as LensComponents from './index'

const useLenses = () => {
  const { selectedLensId, setSelectedLensId } = useContext(LensContext)

  const enhancedSetSelectedLensId = (id) => {
    const nextSelectedLensId = (id === selectedLensId) ? undefined : id
    console.log('Lens changed:', selectedLensId, ' -> ', nextSelectedLensId)
    setSelectedLensId(nextSelectedLensId)
  }

  const lenses = Object.entries(LensComponents)
    .map(([id, { diory }]) => ({ ...diory, id}))
    .map((diory) => ({
      ...diory,
      state: {
        selected: diory.id === selectedLensId,
      },
      onClick: () => enhancedSetSelectedLensId(diory.id),
    }))

  return [{selectedLensId, lenses }, enhancedSetSelectedLensId]
}

export default useLenses
