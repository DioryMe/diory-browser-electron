import React from 'react'
import PropTypes from 'prop-types'

import { Dialog } from 'evergreen-ui'

const Modal = ({ onCancel, onDone, ...props }) => (
  <Dialog
    isShown
    onCancel={onCancel}
    onCloseComplete={onCancel}
    onConfirm={onDone}
    shouldCloseOnOverlayClick={false}
    {...props}
  />
)

Modal.defaultProps = {
  confirmLabel: 'Done',
  onCancel: () => {},
  onDone: () => {},
}

Modal.propTypes = {
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onDone: PropTypes.func,
}

export { Modal }
