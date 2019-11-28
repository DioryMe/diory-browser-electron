import React, { useState } from 'react'
import LensContext from './LensContext'

const LensProvider = ({ children }) => {
  const [selectedLensId, setSelectedLensId] = useState(undefined)
  return (
    <LensContext.Provider value={{ selectedLensId, setSelectedLensId }}>
      { children }
    </LensContext.Provider>
  )
}

export default LensProvider
