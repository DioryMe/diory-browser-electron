import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../../store'

import { invokeChannel } from '../../client/client'
import { convertRelativePath } from '../../utils'

import Diory from './Diory'
import Image from './Image'
import Video from './Video'

const BackgroundImage = ({ diory, contentUrl }) => {
  const imageStyle = {
    ...(diory.style && diory.style.image),
    backgroundSize: 'contain',
    backgroundColor: 'black',
  }
  return (
    <Image
      image={contentUrl}
      style={imageStyle}
      gradient={Boolean(diory.text)}
      gradientRgba="0, 0, 0, 0.2"
    />
  )
}

const BackgroundVideo = ({ diory, contentUrl }) => (
  <Video video={contentUrl} style={diory.style && diory.style.video} />
)

const BackgroundIframe = ({ diory }) => (
  <iframe
    title="content-in-browser"
    src={diory.data && diory.data[0].contentUrl}
    height="100%"
    width="100%"
  />
)

const BackgroundWebpage = ({ contentUrl }) => (
  <iframe title="web-browser" src={contentUrl} height="100%" width="100%" />
)

const OpenPathButton = ({ contentUrl }) => (
  <button
    type="submit"
    onClick={() => invokeChannel('openPath', contentUrl)} // eslint-disable-line react/jsx-curly-newline
  >
    Open in external application
  </button>
)

const DataAwareDiory = ({ diory }) => {
  const [{ connections }] = useStore((state) => state.connectors)

  const { data = [] } = diory
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  const absoluteContentUrl = convertRelativePath(contentUrl, connections)
  switch (encodingFormat) {
    case 'image/jpeg':
      return <BackgroundImage diory={diory} contentUrl={absoluteContentUrl} />
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return <BackgroundVideo diory={diory} contentUrl={absoluteContentUrl} />
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
    case 'application/pdf':
      return <BackgroundIframe diory={diory} contentUrl={absoluteContentUrl} />
    default:
      if (diory.data && diory.data[0].url && /^http(s)?:\/\//.exec(diory.data[0].url)) {
        return <BackgroundImage diory={diory} contentUrl={absoluteContentUrl} />
      }
      if (absoluteContentUrl && /\.html?$/.exec(absoluteContentUrl)) {
        return <BackgroundWebpage contentUrl={absoluteContentUrl} />
      }
      if (absoluteContentUrl) {
        return <OpenPathButton contentUrl={absoluteContentUrl} />
      }
      return <Diory diory={diory} />
  }
}

DataAwareDiory.propTypes = {
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
  }),
}

export default DataAwareDiory
