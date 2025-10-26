import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from './Modal'

const DeleteView = ({ title, diories = [], links = [], onDone, onCancel }) => (
  <Modal title={title} onDone={onDone} onCancel={onCancel} confirmLabel="Delete" intent="danger">
    <p>Are you sure you want to delete?</p>
    {links && links.length && (
      <div>
        <b>Diories</b>
        {diories.map((diory) => (
          <div key={diory.id}>
            <div>{diory.text || diory.id}</div>
          </div>
        ))}
      </div>
    )}
    {links && links.length && (
      <div>
        <b>Links</b>
        {links.map(({ fromDiory, toDiory }) => (
          <div key={fromDiory.id + toDiory.id}>
            {fromDiory.text || fromDiory.id} &rarr; {toDiory.text || toDiory.id}
          </div>
        ))}
      </div>
    )}
  </Modal>
)

DeleteView.propTypes = {
  title: PropTypes.string,
  diories: PropTypes.array,
  links: PropTypes.array,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

export default DeleteView
