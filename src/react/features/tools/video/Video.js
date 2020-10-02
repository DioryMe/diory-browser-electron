import React from 'react'

import { useStore } from '../../../store'

const Video = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]

  return (
    <div>
      <video controls height="480">
        <source src={diory.video} type="video/mp4" />
        <track kind="captions" />
      </video>
    </div>
  )
}

export default Video
