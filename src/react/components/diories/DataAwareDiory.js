import React from 'react'
import PropTypes from 'prop-types'

import Diory from './Diory'
import Image from './Image'
import Video from './Video'
import { invokeChannel } from '../../client/client'

const renderImage = ({ diory }) => {
  const imageStyle = {
    ...(diory.style && diory.style.image),
    backgroundSize: 'contain',
    backgroundColor: 'black',
  }
  return (
    <Image
      image={diory.data && diory.data[0].contentUrl}
      style={imageStyle}
      gradient={Boolean(diory.text)}
      gradientRgba="0, 0, 0, 0.2"
    />
  )
}

const renderVideo = ({ diory }) => (
  <Video video={diory.data && diory.data[0].contentUrl} style={diory.style && diory.style.video} />
)

const renderIframe = ({ diory }) => (
  <iframe
    title="content-in-browser"
    src={diory.data && diory.data[0].contentUrl}
    height="100%"
    width="100%"
  />
)

const renderWebpage = ({ diory }) => (
  <iframe title="web-browser" src={diory.data && diory.data[0].url} height="100%" width="100%" />
)

const renderOpenPathButton = ({ diory }) => (
  <button
    type="submit"
    onClick={() => invokeChannel('openPath', diory.data && diory.data[0].contentUrl)} // eslint-disable-line react/jsx-curly-newline
  >
    Open in external application
  </button>
)

const DataAwareDiory = (props) => {
  const { diory } = props
  const mimeType = diory.data && diory.data[0].encodingFormat
  switch (mimeType) {
    case 'image/jpeg':
      return renderImage(props)
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return renderVideo(props)
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return renderIframe(props)
    case 'application/pdf':
      return renderIframe(props)
    default:
      if (diory.data && diory.data[0].url && /^http(s)?:\/\//.exec(diory.data[0].url)) {
        return renderWebpage(props)
      }
      if (diory.data && diory.data[0].contentUrl && /\.html?$/.exec(diory.data[0].contentUrl)) {
        return renderIframe(props)
      }
      if (diory.data && diory.data[0].contentUrl) {
        return renderOpenPathButton(props)
      }
      return <Diory {...props} />
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
