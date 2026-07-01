import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { useIsHome } from '../features/home/utils/useIsHome'

import { Home } from '../features/home/Home'
import { Browser } from './Browser'
import { Buttons } from '../features/buttons/Buttons'

const Root = () => (
  <DndProvider backend={HTML5Backend}>
    {useIsHome() ? <Home /> : <Browser />}
    <Buttons />
  </DndProvider>
)

export default Root
