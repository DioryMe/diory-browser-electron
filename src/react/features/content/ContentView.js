import React from 'react'
import PropTypes from 'prop-types'

import VideoContent from './video/VideoContent'
import AudioContent from './audio/AudioContent'
import DocumentContent from './document/DocumentContent'
import WebContent from './web/WebContent'

import ImageContent from './image/ImageContent'

const ContentView = ({ url, type, style }) => {
  switch (type) {
    case 'image/jpeg':
      return (
        <div style={style}>
          <ImageContent url={url} />
        </div>
      )
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return (
        <div style={style}>
          <VideoContent url={url} />
        </div>
      )
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return <AudioContent url={url} />
    case 'application/pdf':
      return <DocumentContent url={url} />
    default:
      if (url && /^http(s)?:\/\//.exec(url)) {
        return <WebContent url={url} />
      }
      return null
  }
}

ContentView.propTypes = {
  style: PropTypes.object,
  url: PropTypes.string,
  type: PropTypes.string,
}

export default ContentView
