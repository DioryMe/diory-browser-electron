import React from 'react'
import PropTypes from 'prop-types'

import { useDispatchActions } from '../../../store'

import { inactivateButton } from '../../buttons/buttonsActions'
import { selectMemory } from '../../navigation/navigationActions'

import { deselectTool } from '../toolsActions'

import { FormModal } from '../../../components/FormModal'
import fields from './fields'

const UpdateView = ({ diory, title, onDone }) => {
  const { dispatch } = useDispatchActions()

  const resetView = () => {
    dispatch(inactivateButton())
    dispatch(deselectTool())
    dispatch(selectMemory())
  }

  return (
    <FormModal
      title={title}
      values={diory}
      fields={fields}
      onDone={(updatedDiory) => {
        onDone(updatedDiory)
        resetView()
      }}
      onCancel={resetView}
    />
  )
}

UpdateView.defaultProps = {
  title: '',
  diory: {},
  onDone: () => {},
}

UpdateView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  onDone: PropTypes.func,
}

export default UpdateView
