import React from 'react'
import { Pane } from 'evergreen-ui'
import { useSetHomeAddress } from './useSetHomeAddress'

const SetHomeRoomButton = () => {
  const { onClick } = useSetHomeAddress()
  return (
    <Pane
      cursor="pointer"
      display="flex"
      alignItems="center"
      width={300}
      height={80}
      paddingX={20}
      border="3px solid"
      margin={32}
      onClick={onClick}
    >
      + Choose where your Diory is located on this Computer
    </Pane>
  )
}

export default SetHomeRoomButton
