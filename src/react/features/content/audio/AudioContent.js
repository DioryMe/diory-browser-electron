import React from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/useTogglePlayButtons'
import { useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'
import { getContentUrlFromCID } from '../../../utils'

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
  // TODO: Currently this is not async, but with DiographJsAdapter it should be
  const convertedUrl = getContentUrlFromCID(url)

  const { refCallback, contentElement } = useContentElement()

  useTogglePlayButtons(contentElement, options.autoPlay)
  useOpenFolderButton(convertedUrl)

  return (
    <Fullscreen>
      <audio
        ref={refCallback}
        src={convertedUrl}
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
