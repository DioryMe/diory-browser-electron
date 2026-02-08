import React from 'react'
import { useSelector } from '../../store'
import { useSaveHomeAddress } from './utils/useSaveHomeAddress'

import Fullscreen from '../../components/Fullscreen'
import BackgroundDiory from '../../components/diories/BackgroundDiory'
import Diory from '../../components/diories/Diory'

const welcomeStory = {
  text: 'Welcome to Diory! \n\n Click to choose your Diory location.',
}

export const Welcome = () => {
  const { address } = useSelector((state) => state.home)

  const saveHomeAddress = useSaveHomeAddress()
  return !address ? (
    <Fullscreen>
      <BackgroundDiory diory={{ image: 'diory-demo-content/Scouts BSA International/PIXNIO-53553-1782x1188.jpeg' }} />
      <Diory diory={welcomeStory}  onClick={saveHomeAddress} />
    </Fullscreen>
  ) : null
}
