import React from 'react'
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

export default Modal
