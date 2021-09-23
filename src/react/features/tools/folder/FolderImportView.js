import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from '../../../store'

import Modal from '../../../components/Modal'
import Diory from '../../../components/diories/Diory'

const useImportView = (diory = {}) => {
  const [values, setValues] = useState({})
  const dispatch = useDispatch()
  return {}
}

const FolderImportView = ({}) => {
  return (
    <Modal title="Import Tool" isShown={true} onDone={() => {}} onCancel={() => {}}>
      {importTools.map((tool) => (
        <Diory diory={tool} />
      ))}
    </Modal>
  )
}

FolderImportView.defaultProps = {
  title: '',
  onDone: () => {},
}

FolderImportView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  isShown: PropTypes.bool,
  onDone: PropTypes.func,
}

export default FolderImportView
