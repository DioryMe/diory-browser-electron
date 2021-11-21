import React from 'react'
import { Pane } from 'evergreen-ui'
import { useSetDioryLocation } from './useSetDioryLocation'

const SetDioryLocationButton = () => {
  const { onClick } = useSetDioryLocation()
  return (
    <Pane
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        width: '300px',
        height: '80px',
        padding: '0px 20px',
        border: '3px solid',
      }}
      onClick={onClick}
    >
      + Choose where your Diory is located on this Computer
    </Pane>
  )
}

export default SetDioryLocationButton
