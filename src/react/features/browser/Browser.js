import React from 'react'

import { useSelector } from '../../store'
import { useBrowser } from './useBrowser'

import Fullscreen from '../../components/Fullscreen'
import BrowserView from './BrowserView'

const Browser = (props) => {
  const { storyId } = useSelector((state) => state.navigation)
  const browser = useBrowser()
  return storyId ? (
    <Fullscreen {...props}>
      <BrowserView {...browser} />
    </Fullscreen>
  ) : null
}

export default Browser
