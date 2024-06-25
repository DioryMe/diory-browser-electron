import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useTogglePlayButtons } from '../../buttons/useTogglePlayButtons'
import { useToggleMuteButtons } from '../../buttons/useToggleMuteButtons'
import { useContentElement } from '../contentUtils'

import Fullscreen from '../../../components/Fullscreen'
import { useOpenFolderButton } from '../../buttons/useOpenFolderButton'
import { getContentUrlFromCID } from '../../../utils'

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
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    const { data = [] } = diory
    const { contentUrl, encodingFormat } = (data && data[0]) || {}
    getContentUrlFromCID(contentUrl, encodingFormat).then((url) => setVideoUrl(url))
  }, [])

  // const handleOnLoad = () => {
  //   revokeContentUrl(imageUrl)
  // }

  useOpenFolderButton(videoUrl)
  useTogglePlayButtons(contentElement, options.autoPlay)
  useToggleMuteButtons(contentElement, options.muted)

  return (
    <Fullscreen>
      <video
        ref={refCallback}
        src={videoUrl}
        style={videoStyles}
        data-testid="video-content"
        {...options}
      />
    </Fullscreen>
  )
}

VideoContent.propTypes = {
  diory: PropTypes.object,
  baseUrl: PropTypes.string,
}

export default VideoContent
