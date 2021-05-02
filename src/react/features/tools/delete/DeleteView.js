import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'

const DeleteView = ({ diory, diorys, onDone, onCancel }) => (
  <Modal
    title="Delete tool"
    onDone={onDone}
    onCancel={onCancel}
    confirmLabel="Delete"
    intent="danger"
  >
    <div>
      <p>Are you sure you want to delete?</p>
    </div>
    {diory && (
      <div>
        <div>
          <b>Diory</b>
        </div>
        <div>
          &quot;
          {diory.text || diory.id}
          &quot;
        </div>
      </div>
    )}
    {diorys && diorys.length > 0 && (
      <div>
        <div>
          <b>Links</b>
        </div>
        {Object.values(diorys).map((deletedLink) => (
          <div key={deletedLink.fromDiory && deletedLink.fromDiory.id}>
            &quot;
            {deletedLink.fromDiory && (deletedLink.fromDiory.text || deletedLink.fromDiory.id)}
            &quot; -&gt; &quot;
            {deletedLink.toDiory && (deletedLink.toDiory.text || deletedLink.toDiory.id)}
            &quot;
          </div>
        ))}
      </div>
    )}
  </Modal>
)

DeleteView.propTypes = {
  diory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  diorys: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

export default DeleteView
