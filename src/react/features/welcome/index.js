import React, { useEffect, useState } from 'react'

import { useStore } from '../../store'

import WelcomeView from './WelcomeView'
import SetDioryFolderLocationButton from '../settings/SetDioryFolderLocationButton'

const Welcome = () => {
  const [{ initializing, dioryFolderLocation }] = useStore((state) => state.settings)
  const [showInitially, setShowInitially] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setShowInitially(false)
    }, 2000)
  }, [])

  return !dioryFolderLocation || showInitially ? (
    <WelcomeView>
      {!dioryFolderLocation && !initializing ? <SetDioryFolderLocationButton /> : null}
    </WelcomeView>
  ) : null
}

export default Welcome
