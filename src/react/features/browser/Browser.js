import React from 'react'

import { useGetDiographEffect } from '../diograph/useGetDiographEffect'
import { useBrowser } from './useBrowser'

import Fullscreen from '../../components/Fullscreen'
import BrowserView from './BrowserView'

const Browser = (props) => {
  useGetDiographEffect()

  const browser = useBrowser()
  return browser.story ? (
    <Fullscreen {...props}>
      <BrowserView {...browser} />
    </Fullscreen>
  ) : null
}

export default Browser
