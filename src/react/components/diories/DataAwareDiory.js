import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../../store'

import BackgroundDiory from './BackgroundDiory'
import Video from '../content/Video'
import Audio from '../content/Audio'
import Pdf from '../content/Pdf'
import WebPage from '../content/WebPage'

import { convertRelativePath } from '../../utils'

const DataAwareDiory = ({ playRef, page, diory }) => {
  const [{ folderLocation }] = useStore((state) => state.diograph)
  const { data = [] } = diory
  const { contentUrl, encodingFormat, url } = (data && data[0]) || {}
  const absoluteContentUrl = convertRelativePath(contentUrl, folderLocation)

  switch (encodingFormat) {
    case 'image/jpeg':
      return <BackgroundDiory diory={{ ...diory, image: absoluteContentUrl }} />
    case 'video/mp4':
    case 'video/x-m4v':
    case 'video/quicktime':
      return <Video playRef={playRef} video={absoluteContentUrl} />
    case 'audio/mpeg':
    case 'audio/x-m4a':
    case 'audio/opus':
      return <Audio playRef={playRef} audio={absoluteContentUrl} />
    case 'application/pdf':
      return <Pdf page={page} pdf={absoluteContentUrl} />
    default:
      if (url && /^http(s)?:\/\//.exec(url)) {
        return <WebPage address={url} />
      }

      return <BackgroundDiory diory={diory} />
  }
}

DataAwareDiory.propTypes = {
  playRef: PropTypes.func.isRequired,
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.array,
  }).isRequired,
  page: PropTypes.shape({
    ref: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
}

export default DataAwareDiory
