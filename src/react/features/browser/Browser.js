import React from 'react'

import { useStore } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import Navigation from '../navigation/Navigation'
import Lenses from '../lenses/Lenses'
import Tools from '../tools/Tools'
import Buttons from '../buttons/Buttons'
import Search from '../search/Search'

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
