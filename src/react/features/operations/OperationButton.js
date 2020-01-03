import React from 'react'
import { IconButton } from 'evergreen-ui'

const getActiveProps = (active) => active && {
  appearance: 'primary',
  intent: 'success',
}

const OperationButton = ({ data, active, onClick }) => (
  <div>
    <IconButton
      {...getActiveProps(active)}
      icon={ data.icon }
      iconSize={24}
      height={56}
      margin={8}
      borderRadius={'50%'}
      onClick={onClick}
    />
  </div>
)

export default OperationButton
