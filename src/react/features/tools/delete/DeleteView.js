import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'

const DeleteView = ({ diory, links, title, onDone }) => {
  const linkList = links ? (
    <div>
      <div>Links:</div>
      {Object.values(links).map((link) => (
        <div key={link.id}>{link.id}</div>
      ))}
    </div>
  ) : null

  return (
    <Modal title={title} onDone={onDone} confirmLabel="Delete" intent="danger">
      <div>
        <p>Are you sure you want to delete?</p>
      </div>
      {diory ? (
        <div>
          <p>
            Diory:
            {diory.text}
          </p>
        </div>
      ) : null}
      {linkList}
    </Modal>
  )
}

DeleteView.defaultProps = {
  title: 'Delete tool',
  diory: undefined,
  onDone: () => {},
}

DeleteView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
  }),
  onDone: PropTypes.func,
}

export default DeleteView
