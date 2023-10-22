import React from 'react'

import { useDiograph } from '../diograph/useDiograph'
import { useDiosphere } from '../diosphere/useDiosphere'

import ContentView from './ContentView'

const contentStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: '0 48px',
  backgroundPosition: 'top',
}

const Content = () => {
  const { story } = useDiograph()
  const { room } = useDiosphere()
  const baseUrl = room.connections[0].address
  return <ContentView diory={story} style={contentStyle} baseUrl={baseUrl} />
}

export default Content
