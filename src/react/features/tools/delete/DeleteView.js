import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'

const DeleteView = ({ diory, title, isShown, onDone }) => (
  <Modal title={title} isShown={isShown} onDone={onDone} />
)

DeleteView.defaultProps = {
  title: '',
  diory: {},
  isShown: false,
  onDone: () => {},
}

DeleteView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
  }),
  isShown: PropTypes.bool,
  onDone: PropTypes.func,
}

export default DeleteView
