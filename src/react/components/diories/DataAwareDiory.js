import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../../store'

import BackgroundDiory from './BackgroundDiory'
import Diory from './Diory'
import Video from '../content/Video'
import Audio from '../content/Audio'
import Pdf from '../content/Pdf'

import { convertRelativePath } from '../../utils'

const DataAwareDiory = ({ playRef, page, diory }) => {
  const [{ connections }] = useStore((state) => state.connectors)
  const { data = [] } = diory
  const { contentUrl, encodingFormat } = (data && data[0]) || {}
  const absoluteContentUrl = convertRelativePath(contentUrl, connections)

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
      return <Diory diory={diory} />
  }
}

DataAwareDiory.propTypes = {
  playRef: PropTypes.func.isRequired,
  diory: PropTypes.shape({
    image: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object,
  }),
  page: PropTypes.shape({
    ref: PropTypes.func.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
}

export default DataAwareDiory
