import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Box from 'ui-box'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'
import { getContentUrlFromCID, revokeContentUrl } from '../../../utils'

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
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    const { data = [] } = diory
    const { contentUrl, encodingFormat } = (data && data[0]) || {}
    getContentUrlFromCID(contentUrl, encodingFormat).then((url) => setImageUrl(url))
  }, [])

  const handleOnLoad = () => {
    revokeContentUrl(imageUrl)
  }

  // TODO: This needs the absolute file path
  useOpenFolderButton(imageUrl)

  return (
    <Box style={defaultStyles}>
      <img width="100%" src={imageUrl} onLoad={handleOnLoad} alt="" />
    </Box>
  )
}

ImageContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default ImageContent
