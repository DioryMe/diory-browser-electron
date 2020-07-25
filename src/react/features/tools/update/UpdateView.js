import React from 'react'
import PropTypes from 'prop-types'

import Modal from '../../../components/Modal'
import TextInput from '../../../components/TextInput'

const UpdateView = ({ title, fields, isShown, onChange, onDone, onCancel }) => (
  <Modal title={title} isShown={isShown} onDone={onDone} onCancel={onCancel}>
    {fields.map(({ key, label, format, value }) => (
      <TextInput
        key={key}
        label={label}
        format={format}
        value={value}
        onChange={(value) => onChange(key, value)}
      />
    ))}
  </Modal>
)

UpdateView.defaultProps = {
  title: '',
  fields: [],
  isShown: false,
  onChange: () => {},
  onDone: () => {},
  onCancel: () => {},
}

UpdateView.propTypes = {
  title: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      format: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    })
  ),
  isShown: PropTypes.bool,
  onChange: PropTypes.func,
  onDone: PropTypes.func,
  onCancel: PropTypes.func,
}

export default UpdateView
