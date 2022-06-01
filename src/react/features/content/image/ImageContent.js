import React from 'react'
import PropTypes from 'prop-types'

// import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'

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

const ImageContent = ({ imageUrl }) => (
  // useOpenFolderButton(imageUrl)

  <Image image={imageUrl} style={defaultStyles} data-testid="image-content" {...options} />
)

ImageContent.propTypes = {
  imageUrl: PropTypes.string,
}

export default ImageContent
