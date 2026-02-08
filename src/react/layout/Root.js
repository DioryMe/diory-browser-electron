import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Home } from '../features/home/Home'
import { Browser } from './Browser'
import { Buttons } from '../features/buttons/Buttons'
import { Welcome } from '../features/home/Welcome'

const Root = () => (
  <DndProvider backend={HTML5Backend}>
    <Welcome />
    <Home />
    <Browser />
    <Buttons />
  </DndProvider>
)

export default Root
