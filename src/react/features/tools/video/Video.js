import React from 'react'

import { useStore } from '../../../store'

const Video = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]

  return (
    <div>
      <video controls height="480">
        <source src={diory.image} type="video/mp4" />
      </video>
      <track kind="captions" />
    </div>
  )
}

export default Video
