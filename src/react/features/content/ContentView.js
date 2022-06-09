import React from 'react'
import PropTypes from 'prop-types'

import VideoContent from './video/VideoContent'
import AudioContent from './audio/AudioContent'
import DocumentContent from './document/DocumentContent'
import WebContent from './web/WebContent'

import ImageContent from './image/ImageContent'

const ContentView = ({ diory }) => {
  console.log('fönderreedd', diory)
  const { data = [] } = diory
  const { contentUrl } = diory
  const { encodingFormat, url } = (data && data[0]) || {}

  switch (encodingFormat) {
    case 'image/jpeg':
      return <ImageContent imageUrl={contentUrl} />
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return <VideoContent videoUrl={contentUrl} />
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return <AudioContent audioUrl={contentUrl} />
    case 'application/pdf':
      return <DocumentContent documentUrl={contentUrl} />
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
    contentUrl: PropTypes.string,
    data: PropTypes.array,
  }).isRequired,
}

export default ContentView
