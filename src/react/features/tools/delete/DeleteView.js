import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'

const DeleteView = ({ deleteDioryAndLinks, resetView, deletedDiory, deletedLinks }) => (
  <Modal
    title="Delete tool"
    onDone={deleteDioryAndLinks}
    onCancel={resetView}
    confirmLabel="Delete"
    intent="danger"
  >
    <div>
      <p>Are you sure you want to delete?</p>
    </div>
    {deletedDiory && (
      <div>
        <div>
          <b>Diory</b>
        </div>
        <div>
          &quot;
          {deletedDiory.text}
          &quot;
        </div>
      </div>
    )}
    {deletedLinks && deletedLinks.length > 0 && (
      <div>
        <div>
          <b>Links</b>
        </div>
        {Object.values(deletedLinks).map((deletedLink) => (
          <div key={deletedLink.fromDiory.id}>
            &quot;
            {deletedLink.fromDiory.text || deletedLink.fromDiory.id}
            &quot; -&gt; &quot;
            {deletedLink.toDiory.text || deletedLink.toDiory.id}
            &quot;
          </div>
        ))}
      </div>
    )}
  </Modal>
)

DeleteView.propTypes = {
  deletedDiory: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }),
  deletedLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  deleteDioryAndLinks: PropTypes.func,
  resetView: PropTypes.func,
}

export default DeleteView
