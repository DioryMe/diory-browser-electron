import React from 'react'

import { useSelector } from 'react-redux'

import ContentView from './ContentView'
import { useContentUrl } from './useContentUrl'
import { useDiograph } from '../diograph/useDiograph'

const contentStyle = {
  position: 'relative',
  height: '100%',
  margin: '48px',
}

const Content = () => {
  useContentUrl()
  const { contentUrl } = useSelector((state) => state.content)

  const { story = {} } = useDiograph()
  const { data = [] } = story
  const { encodingFormat } = (data && data[0]) || {}
  return <ContentView url={contentUrl} type={encodingFormat} style={contentStyle} />
}

export default Content
