import React from 'react'

import ContentView from './ContentView'
import { useDiograph } from '../diograph/useDiograph'

const contentStyle = {
  position: 'relative',
  height: '100%',
  margin: '48px',
}

const getAddressPath = (address) => {
  const addressArray = address.split('/') || []
  return addressArray.slice(1, -1).join('/')
}

const Content = () => {
  const { story = {} } = useDiograph()
  const { data = [] } = story
  const { encodingFormat, contentUrl } = (data && data[0]) || {}
  const path = getAddressPath(story.key)
  const url = `${path}${contentUrl}`
  return <ContentView url={url} type={encodingFormat} style={contentStyle} />
}

export default Content
