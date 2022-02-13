import React from 'react'
import PropTypes from 'prop-types'

import { useSelector } from '../../store'

import VideoContent from './video/VideoContent'
import AudioContent from './audio/AudioContent'
import DocumentContent from './document/DocumentContent'
import WebContent from './web/WebContent'

import ImageContent from './image/ImageContent'

const ContentView = ({ diory }) => {
  const { dioryFolderLocation } = useSelector((state) => state.settings)
  const { data = [] } = diory
  const { encodingFormat, url } = (data && data[0]) || {}

  switch (encodingFormat) {
    case 'image/jpeg':
      return <ImageContent diory={diory} baseUrl={dioryFolderLocation} />
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return <VideoContent diory={diory} baseUrl={dioryFolderLocation} />
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return <AudioContent diory={diory} baseUrl={dioryFolderLocation} />
    case 'application/pdf':
      return <DocumentContent diory={diory} baseUrl={dioryFolderLocation} />
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
}

export default ContentView
