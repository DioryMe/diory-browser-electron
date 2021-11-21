import React, { useEffect, useState } from 'react'
import { Heading, Pane } from 'evergreen-ui'

import Fullscreen from '../../components/Fullscreen'
import SetDioryLocationButton from '../settings/SetDioryLocationButton'
import { useStore } from '../../store'

const Welcome = () => {
  const [{ initializing, dioryLocation }] = useStore((state) => state.settings)

  const [showInitially, setShowInitially] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowInitially(false)
    }, 2000)
  }, [])

  return !dioryLocation || showInitially ? (
    <Fullscreen
      background="#fcd600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={100}
    >
      <Pane
        height={100}
        display="flex"
        alignItems="top"
        justifyContent="center"
        flexWrap="wrap"
        textAlign="center"
      >
        <Heading size={900} width="100%">
          Welcome to Diory!
        </Heading>
        {!dioryLocation && !initializing ? <SetDioryLocationButton /> : null}
      </Pane>
    </Fullscreen>
  ) : null
}

export default Welcome
