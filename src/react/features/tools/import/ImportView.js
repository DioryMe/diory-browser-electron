import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../components/Modal'

const ImportView = ({ onDone, onCancel, children }) => (
  <Modal
    title="Import tools"
    isShown
    display="flex"
    flexWrap="wrap"
    margin={24}
    alignContent="flex-start"
    onDone={onDone}
    onCancel={onCancel}
  >
    {children}
  </Modal>
)

ImportView.propTypes = {
  onDone: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default ImportView
