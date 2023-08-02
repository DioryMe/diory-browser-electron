import React from 'react'

import { useSelector } from '../../store'

import WelcomeView from './WelcomeView'
import SetHomeRoomButton from '../home/SetHomeRoomButton'

const Welcome = () => {
  const { initializing, connections } = useSelector((state) => state.home)
  const address = !!connections.length && connections[0].address
  return !address ? <WelcomeView>{!initializing ? <SetHomeRoomButton /> : null}</WelcomeView> : null
}

export default Welcome
