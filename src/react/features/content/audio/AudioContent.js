import React, { useEffect, useState } from 'react'
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

const AudioContent = ({ diory, baseUrl }) => {
  const { refCallback, contentElement } = useContentElement()

  const [audioUrl, setAudioUrl] = useState(null)

  useEffect(() => {
    const { data = [] } = diory
    const { contentUrl, encodingFormat } = (data && data[0]) || {}
    getContentUrlFromCID(contentUrl, encodingFormat).then((url) => setAudioUrl(url))
  }, [diory])

  // const handleOnLoad = () => {
  //   revokeContentUrl(imageUrl)
  // }

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
