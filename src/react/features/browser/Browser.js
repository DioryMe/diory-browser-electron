import React from 'react'

import { useBrowser } from './useBrowser'

import BrowserView from './BrowserView'

const Browser = () => <BrowserView {...useBrowser()} />

export default Browser
