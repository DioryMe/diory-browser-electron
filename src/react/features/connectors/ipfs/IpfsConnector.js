import React from 'react'

import { useGetRoomEffect } from './effects/useGetRoomEffect'
import { useSaveRoomEffect } from './effects/useSaveRoomEffect'

const IpfsConnector = () => {
  useGetRoomEffect()
  useSaveRoomEffect()

  return (
    <div data-testid="ipfs-connector">
      <div>ipfs</div>
    </div>
  )
}

export default IpfsConnector
