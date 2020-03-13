import React from 'react'
import { IconButton } from 'evergreen-ui'

const getActiveProps = active =>
  active && {
    appearance: 'primary',
    intent: 'success',
  }

const OperationButton = ({ id, data, active, onClick }) => (
  <div
    data-testid={id + '-button' + (active ? '--active' : '')}
    onClick={onClick}
  >
    <IconButton
      {...getActiveProps(active)}
      icon={data.icon}
      iconSize={24}
      height={56}
      margin={8}
      borderRadius={'50%'}
    />
  </div>
)

export default OperationButton
