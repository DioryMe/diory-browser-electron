import React from 'react'

import { useDiograph } from '../diograph/useDiograph'
import { useDiosphere } from '../diosphere/useDiosphere'

import ContentView from './ContentView'

const contentStyle = {
  position: 'relative',
  height: '100%',
  margin: '48px',
}

const Content = () => {
  const { story } = useDiograph()
  const { room } = useDiosphere()
  const baseUrl = room.connections[0].address
  return <ContentView diory={story} style={contentStyle} baseUrl={baseUrl} />
}

export default Content
