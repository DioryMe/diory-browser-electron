import React, { useEffect, useState } from 'react'

import { useStore } from '../../store'

import WelcomeView from './WelcomeView'
import SetDioryFolderLocationButton from '../settings/SetDioryFolderLocationButton'

const Welcome = () => {
  const [{ initializing, dioryFolderLocation }] = useStore((state) => state.settings)
  const [showInitially, setShowInitially] = useState(true)

  useEffect(() => {
    setTimeout(
      () => {
        setShowInitially(false)
      },
      window.Cypress && process.env.NODE_ENV === 'development' ? 0 : 2000
    )
  }, [])

  return !dioryFolderLocation || showInitially ? (
    <WelcomeView>
      {!dioryFolderLocation && !initializing ? <SetDioryFolderLocationButton /> : null}
    </WelcomeView>
  ) : null
}

export default Welcome
