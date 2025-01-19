import React from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/utils/useTogglePlayButtons'
import { useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/utils/useOpenFolderButton'

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

const AudioContent = ({ url }) => {
  const { refCallback, contentElement } = useContentElement()

  useTogglePlayButtons(contentElement, options.autoPlay)
  useOpenFolderButton(url)

  return (
    <Fullscreen>
      <audio
        ref={refCallback}
        src={url}
        style={audioStyles}
        data-testid="audio-content"
        {...options}
      />
    </Fullscreen>
  )
}

AudioContent.propTypes = {
  url: PropTypes.string,
}

export default AudioContent
