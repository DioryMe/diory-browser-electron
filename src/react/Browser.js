import React from 'react'

import { useStore } from './store'

import Fullscreen from './components/Fullscreen'
import Navigation from './features/navigation'
import Lenses from './features/lenses'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons'
import Search from './features/search'

const Browser = (props) => {
  const [{ showSearchBar }] = useStore((state) => state.search)
  const [{ loaded }] = useStore((state) => state.diograph)
  const [{ storyId }] = useStore((state) => state.navigation)
  return loaded && storyId ? (
    <Fullscreen {...props}>
      <Navigation />
      <Lenses right={showSearchBar ? 300 : 0} />
      <Search width={300} />
      <Tools />
      <Buttons />
    </Fullscreen>
  ) : null
}

export default Browser
