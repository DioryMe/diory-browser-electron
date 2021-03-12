import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../components/Modal'
import { useDeleteDioryAndLinks } from './useDeleteDioryAndLinks'

const DeleteView = ({ focus, linkDiory }) => {
  const { deleteDioryAndLinks } = useDeleteDioryAndLinks(focus, linkDiory)

  const { links } = focus
  const diory = focus

  const linkList = links ? (
    <div>
      <div>Links:</div>
      {Object.values(links).map((link) => (
        <div key={link.id}>{link.id}</div>
      ))}
    </div>
  ) : null

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
      {diory.id ? (
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
  focus: { links: [] },
  linkDiory: undefined,
}

DeleteView.propTypes = {
  linkDiory: PropTypes.shape({
    id: PropTypes.string,
  }),
  focus: PropTypes.shape({
    id: PropTypes.string,
  }),
}

export default DeleteView
