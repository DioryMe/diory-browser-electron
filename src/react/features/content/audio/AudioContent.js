import React from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/useTogglePlayButtons'
import { getContentUrl, useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'

const audioStyles = {
  display: 'block',
  height: '100%',
  margin: '0 auto',
  maxWidth: '100%',
}

const options = {
  controls: false,
  loop: true,
  autoPlay: false,
  muted: false,
}

const AudioContent = ({ diory, baseUrl }) => {
  const { refCallback, contentElement } = useContentElement()
  const audioUrl = getContentUrl(diory, baseUrl)

  useTogglePlayButtons(contentElement, options.autoPlay)
  useOpenFolderButton(audioUrl)

  return (
    <Fullscreen>
      <audio
        ref={refCallback}
        src={audioUrl}
        style={audioStyles}
        data-testid="audio-content"
        {...options}
      />
    </Fullscreen>
  )
}

AudioContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default AudioContent
