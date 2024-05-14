import React from 'react'

import { useBrowser } from './useBrowser'

import BrowserView from './BrowserView'

const Browser = () => {
  const browser = useBrowser()
  return browser.story ? <BrowserView {...browser} /> : null
}

export default Browser
