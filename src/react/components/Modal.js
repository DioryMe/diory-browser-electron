import React from 'react'
import PropTypes from 'prop-types'

import { Dialog } from 'evergreen-ui'

const Modal = ({ isShown, onCancel, onDone, ...props }) => (
  <Dialog
    isShown={isShown}
    onCancel={onCancel}
    onCloseComplete={onCancel}
    onConfirm={onDone}
    overlayProps={{
      onClick: onCancel,
    }}
    containerProps={{
      onClick: (event) => event.stopPropagation(),
    }}
    {...props}
  />
)

Modal.defaultProps = {
  isShown: true,
  confirmLabel: 'Done',
}

Modal.propTypes = {
  isShown: PropTypes.bool,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
}

export default Modal
