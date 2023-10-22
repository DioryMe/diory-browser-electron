import React from 'react'
import PropTypes from 'prop-types'

import VideoContent from './video/VideoContent'
import AudioContent from './audio/AudioContent'
import DocumentContent from './document/DocumentContent'
import WebContent from './web/WebContent'

import ImageContent from './image/ImageContent'

const ContentView = ({ diory, style, baseUrl }) => {
  const { data = [] } = diory
  const { encodingFormat, url } = (data && data[0]) || {}

  switch (encodingFormat) {
    case 'image/jpeg':
      return (
        <div style={style}>
          <ImageContent diory={diory} baseUrl={baseUrl} />
        </div>
      )
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return (
        <div style={style}>
          <VideoContent diory={diory} baseUrl={baseUrl} />
        </div>
      )
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return <AudioContent diory={diory} baseUrl={baseUrl} />
    case 'application/pdf':
      return <DocumentContent diory={diory} baseUrl={baseUrl} />
    default:
      if (url && /^http(s)?:\/\//.exec(url)) {
        return <WebContent diory={diory} />
      }
      return null
  }
}

ContentView.propTypes = {
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
  }).isRequired,
  style: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default ContentView
