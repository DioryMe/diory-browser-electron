import React from 'react'

import { useStore } from './store'

import Navigation from './features/navigation/Navigation'
import Lenses from './features/lenses/Lenses'
import Tools from './features/tools/Tools'
import Buttons from './features/buttons'
import Search from './features/search/Search'

const Browser = () => {
  const [{ showSearchBar }] = useStore((state) => state.search)
  return (
    <div className="App">
      <Navigation />
      <Lenses right={showSearchBar ? 300 : 0} />
      <Search width={300} />
      <Tools />
      <Buttons />
    </div>
  )
}

export default Browser
