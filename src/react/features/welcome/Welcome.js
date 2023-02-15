import React, { useEffect, useState } from 'react'

import { useSelector } from '../../store'

import WelcomeView from './WelcomeView'
import SetHomeRoomButton from '../room/SetHomeRoomButton'

const Welcome = () => {
  const { initializing, address } = useSelector((state) => state.room)
  const [showInitially, setShowInitially] = useState(true)

  useEffect(() => {
    setTimeout(
      () => {
        setShowInitially(false)
      },
      window.Cypress && process.env.NODE_ENV === 'development' ? 0 : 2000
    )
  }, [])

  return !address || showInitially ? (
    <WelcomeView>{!address && !initializing ? <SetHomeRoomButton /> : null}</WelcomeView>
  ) : null
}

export default Welcome
