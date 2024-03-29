import React from 'react'
import PropTypes from 'prop-types'

import { Dialog } from 'evergreen-ui'

const Modal = ({ isShown, onCancel, onDone, ...props }) => (
  <Dialog
    isShown={isShown}
    onCancel={onCancel}
    onCloseComplete={onCancel}
    onConfirm={onDone}
    shouldCloseOnOverlayClick={false}
    {...props}
  />
)

Modal.defaultProps = {
  isShown: true,
  confirmLabel: 'Done',
  onCancel: () => {},
  onDone: () => {},
}

Modal.propTypes = {
  isShown: PropTypes.bool,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
}

export default Modal
