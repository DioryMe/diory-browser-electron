import React from 'react'
import PropTypes from 'prop-types'
import { Pane } from 'evergreen-ui'

import VideoContent from './video/VideoContent'
import AudioContent from './audio/AudioContent'
import DocumentContent from './document/DocumentContent'
import WebContent from './web/WebContent'
import ImageContent from './image/ImageContent'

const ContentView = ({ url, type }) => {
  switch (type) {
    case 'image/jpeg':
      return <ImageContent url={url} />
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return <VideoContent url={url} />
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

      if (url) {
        return <div>Default content</div>
      }

      return null
  }
}

ContentView.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
}

export { ContentView }
