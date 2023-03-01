import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useSelector } from '../../store'

import Fullscreen from '../../components/Fullscreen'
import Navigation from '../navigation/Navigation'
import Lenses from '../lenses/Lenses'
import Tools from '../tools/Tools'
import Buttons from '../buttons/Buttons'
import Search from '../search/Search'

const Browser = (props) => {
  const { showSearchBar } = useSelector((state) => state.search)
  const { loaded } = useSelector((state) => state.diograph)
  const { storyId } = useSelector((state) => state.navigation)
  return loaded && storyId ? (
    <DndProvider backend={HTML5Backend}>
      <Fullscreen {...props}>
        <Navigation />
        <Lenses right={showSearchBar ? 300 : 0} marginTop={48} />
        <Search width={300} marginTop={48} />
        <Tools />
        <Buttons />
      </Fullscreen>
    </DndProvider>
  ) : (
    <div>loading...</div>
  )
}

export default Browser
