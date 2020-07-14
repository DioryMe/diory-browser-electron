import React from 'react'
import PropTypes from 'prop-types'

import { TextInputField } from 'evergreen-ui'

const TextInput = ({ onChange, ...props }) => (
  <TextInputField onChange={({ target: { value } }) => onChange(value)} {...props} />
)

TextInput.defaultProps = {
  isInvalid: false,
  required: false,
  label: undefined,
  description: undefined,
  placeholder: undefined,
  hint: undefined,
  validationMessage: undefined,
  value: undefined,
  onChange: () => {},
}

TextInput.propTypes = {
  isInvalid: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  validationMessage: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput
