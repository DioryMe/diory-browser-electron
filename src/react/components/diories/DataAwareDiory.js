import React from 'react'
import PropTypes from 'prop-types'
import { getUntrackedObject } from 'react-tracked'
import { useStore } from '../../store'
import { convertRelativePath } from '../../utils'

import Diory from './Diory'
import Image from './Image'
import Video from './Video'
import { invokeChannel } from '../../client/client'

const showImage = (props, diory, data) => {
  const imageStyle = {
    ...(diory.style && diory.style.image),
    backgroundSize: 'contain',
    backgroundColor: 'black',
  }
  return (
    <Image
      image={diory.data && diory.data.contentUrl}
      style={imageStyle}
      gradient={Boolean(diory.text)}
      gradientRgba="0, 0, 0, 0.2"
    />
  )
}

const showVideo = (props, diory, data) => (
  <Video video={data && data.contentUrl} style={diory.style && diory.style.video} />
)

const showInBrowser = (props, diory, data) => (
  <iframe title="content-in-browser" src={data && data.contentUrl} height="100%" width="100%" />
)

const showWebpage = (props, diory, data) => (
  <iframe title="web-browser" src={data && data.url} height="100%" width="100%" />
)

const showExternalApplicationButton = (props, diory, data) => (
  <button
    type="submit"
    onClick={() => invokeChannel('openInExternalApplication', data && data.contentUrl)}
  >
    Open in external application
  </button>
)

const DataAwareDiory = (props) => {
  const { diory } = props
  const data = getUntrackedObject(diory.data)
  const mimeType = data && data.encodingFormat
  // Convert contentUrls to absolute paths
  const [{ connections }] = useStore((state) => state.connectors)
  if (data) {
    data.contentUrl = convertRelativePath(data.contentUrl, connections)
  }
  switch (mimeType) {
    case 'image/jpeg':
      return showImage(props, diory, data)
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return showVideo(props, diory, data)
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return showInBrowser(props, diory, data)
    case 'application/pdf':
      return showInBrowser(props, diory, data)
    default:
      if (data && data.url && /^http(s)?:\/\//.exec(data.url)) {
        return showWebpage(props, diory, data)
      }
      if (data && data.contentUrl && /\.html?$/.exec(data.contentUrl)) {
        return showInBrowser(props, diory, data)
      }
      if (data && data.contentUrl) {
        return showExternalApplicationButton(props, diory, data)
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
