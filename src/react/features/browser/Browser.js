import React from 'react'

import { useSelector } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import Navigation from '../navigation/Navigation'
import Lenses from '../lenses/Lenses'
import Tools from '../tools/Tools'
import Buttons from '../buttons/Buttons'
import Search from '../search/Search'

const Browser = () => {
  const { showSearchBar } = useSelector((state) => state.search)
  const { loaded } = useSelector((state) => state.diograph)
  const { storyId } = useSelector((state) => state.navigation)
  console.log('I am above you')

  return (
    loaded &&
    storyId && (
      <Fullscreen>
        <Navigation />
        <Lenses right={showSearchBar ? 300 : 0} marginTop={48} />
        <Search width={300} marginTop={48} />
        <Tools />
        <Buttons />
      </Fullscreen>
    )
  )
}

export default Browser
