import React from 'react'
import { IconButton } from 'evergreen-ui'

const OperationButton = ({ active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: 'fixed',
      zIndex: 1000,
      bottom: 0,
      cursor: 'pointer',
      left: 0,
      padding: 16,
    }}>
    <IconButton
      icon="plus"
      appearance={active && 'primary'}
      intent={active && 'success'}
      iconSize={24}
      height={56}
      borderRadius={'50%'}
    />
  </div>
)

export default OperationButton
