import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'
import { useDeleteDioryAndLinks } from './useDeleteDioryAndLinks'

const DeleteView = ({ focus, clickedDiory }) => {
  const { deleteDioryAndLinks, deletedDiory, deletedLinks } = useDeleteDioryAndLinks(
    focus,
    clickedDiory
  )

  return (
    <Modal
      title="Delete tool"
      onDone={() => deleteDioryAndLinks()}
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
      {deletedLinks.length > 0 && (
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
}

DeleteView.propTypes = {
  focus: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  clickedDiory: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}

export default DeleteView
