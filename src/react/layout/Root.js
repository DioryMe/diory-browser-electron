import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useDiograph } from '../features/diograph/utils/useDiograph'
import { useIsHome } from '../features/home/utils/useIsHome'

import { Home } from '../features/home/Home'
import { Browser } from './Browser'
import { Buttons } from '../features/buttons/Buttons'
import { Welcome } from '../features/home/Welcome'

const Root = () => {
  const diographData = useDiograph()
  return (
    <DndProvider backend={HTML5Backend}>
      <Welcome />
      {useIsHome() ? <Home /> : <Browser {...diographData} />}
      <Buttons />
    </DndProvider>
  )
}

export default Root
