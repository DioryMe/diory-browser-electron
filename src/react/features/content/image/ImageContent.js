import React from 'react'
import PropTypes from 'prop-types'

import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'

import Image from '../../../components/diories/Image'
import { getContentUrlFromCID } from '../../../store/dioryClientAdapter'

const defaultStyles = {
  backgroundSize: 'contain',
}

const options = {
  controls: false,
  loop: false,
  autoPlay: false,
  muted: false,
}

const ImageContent = ({ url }) => {
  // TODO: Currently this is not async, but with DiographJsAdapter it should be
  const convertedUrl = getContentUrlFromCID(url)

  console.log(convertedUrl)
  useOpenFolderButton(convertedUrl)

  return (
    <Image image={convertedUrl} style={defaultStyles} data-testid="image-content" {...options} />
  )
}

ImageContent.propTypes = {
  url: PropTypes.string,
}

export default ImageContent
