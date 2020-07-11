import React from 'react'

import { useStore } from '../../../store'

const Video = () => {
  const [{ focus }] = useStore((state) => state.navigation)
  const [{ diograph }] = useStore((state) => state.room)
  const diory = diograph[focus]

  return (
    // {!diorys.length &&
    //   (diory.image.toLowerCase().includes('.mov') ||
    //     diory.image.toLowerCase().includes('.mp4') ||
    //     diory.image.toLowerCase().includes('.avi')) && (
    <video controls width="250">
      <source src={diory.image} type="video/mp4" />
    </video>
    // )}
  )
}

export default Video
