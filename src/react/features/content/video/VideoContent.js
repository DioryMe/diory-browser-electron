import React from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/utils/useTogglePlayButtons'
import { useToggleMuteButtons } from '../../buttons/utils/useToggleMuteButtons'
import { useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/utils/useOpenFolderButton'

const videoStyles = {
  display: 'block',
  height: '100%',
  margin: '0 auto',
  maxWidth: '100%',
}

const options = {
  controls: false,
  loop: true,
  autoPlay: true,
  muted: false,
}

const VideoContent = ({ url }) => {
  const { refCallback, contentElement } = useContentElement()

  useOpenFolderButton(url)
  useTogglePlayButtons(contentElement, options.autoPlay)
  useToggleMuteButtons(contentElement, options.muted)

  return (
    <Fullscreen>
      <video
        ref={refCallback}
        src={url}
        style={videoStyles}
        data-testid="video-content"
        {...options}
      />
    </Fullscreen>
  )
}

VideoContent.propTypes = {
  url: PropTypes.string,
}

export default VideoContent
