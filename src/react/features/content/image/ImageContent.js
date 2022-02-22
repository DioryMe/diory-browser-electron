import React from 'react'
import PropTypes from 'prop-types'

import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'
import { convertToFileUrl } from '../../../utils'

import Image from '../../../components/diories/Image'

const defaultStyles = {
  backgroundSize: 'contain',
}

const options = {
  controls: false,
  loop: false,
  autoPlay: false,
  muted: false,
}

const ImageContent = ({ diory, baseUrl }) => {
  const { data = [] } = diory
  const { contentUrl } = (data && data[0]) || {}
  const imageUrl = convertToFileUrl(contentUrl, baseUrl)

  useOpenFolderButton(imageUrl)

  return <Image image={imageUrl} style={defaultStyles} data-testid="image-content" {...options} />
}

ImageContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default ImageContent
