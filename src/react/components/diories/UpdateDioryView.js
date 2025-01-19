import React from 'react'
import PropTypes from 'prop-types'

import { FormModal } from '../FormModal'
import fields from './dioryFields'

const UpdateDioryView = ({ diory, title, onDone, onCancel }) => (
  <FormModal title={title} values={diory} fields={fields} onDone={onDone} onCancel={onCancel} />
)

UpdateDioryView.defaultProps = {
  title: '',
  diory: {},
  onDone: () => {},
  onCancel: () => {},
}

UpdateDioryView.propTypes = {
  title: PropTypes.string,
  diory: PropTypes.shape({
    text: PropTypes.string,
    image: PropTypes.string,
    style: PropTypes.object,
  }),
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

export default UpdateDioryView
