import React from 'react'
import PropTypes from 'prop-types'

import { useOpenFolderButton } from '../../buttons/utils/useOpenFolderButton'

import { Image } from '../../../components/diories/Image'

const defaultStyles = {
  backgroundSize: 'contain',
}

const options = {
  controls: false,
  loop: false,
  autoPlay: false,
  muted: false,
}

const ImageContent = ({ url, onClick }) => {
  useOpenFolderButton(url)

  return (
    <Image
      image={url}
      style={defaultStyles}
      data-testid="image-content"
      {...options}
      onClick={onClick}
    />
  )
}

ImageContent.propTypes = {
  url: PropTypes.string,
  onClick: PropTypes.func,
}

export default ImageContent
