import React from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/useTogglePlayButtons'
import { useToggleMuteButtons } from '../../buttons/useToggleMuteButtons'
import { getContentUrl, useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'

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
  muted: true,
}

const VideoContent = ({ diory, baseUrl }) => {
  const { refCallback, contentElement } = useContentElement()
  const videoUrl = getContentUrl(diory, baseUrl)

  useOpenFolderButton(videoUrl)
  useTogglePlayButtons(contentElement, options.autoPlay)
  useToggleMuteButtons(contentElement, options.muted)

  return (
    <Fullscreen>
      <video ref={refCallback} src={videoUrl} style={videoStyles} {...options} />
    </Fullscreen>
  )
}

VideoContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default VideoContent
