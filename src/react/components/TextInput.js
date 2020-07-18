import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { TextInputField } from 'evergreen-ui'

function stringifyValue(value, format) {
  if (format === 'object') {
    return JSON.stringify(value)
  }

  return value
}

function parseValue(value, format) {
  if (format === 'object') {
    return JSON.parse(value)
  }

  return value
}

function validateValue(value, format) {
  if (format === 'object') {
    try {
      JSON.parse(value)
    } catch (e) {
      return false
    }
  }

  return true
}

const useValidation = (format, onChange) => {
  const [isInvalid, setIsInvalid] = useState(false)

  return {
    validatedOnChange: (updatedValue) => {
      const isValid = validateValue(updatedValue, format)
      setIsInvalid(!isValid)
      if (isValid) {
        onChange(parseValue(updatedValue, format))
      }
    },
    isInvalid,
    validationMessage: isInvalid && `Invalid ${format}`,
  }
}

const TextInput = ({ format, value, onChange, ...props }) => {
  const { validatedOnChange, isInvalid, validationMessage } = useValidation(format, onChange)
  return (
    <TextInputField
      value={stringifyValue(value, format)}
      onChange={({ target: { value } }) => validatedOnChange(value)}
      isInvalid={isInvalid}
      validationMessage={validationMessage}
      {...props}
    />
  )
}

TextInput.defaultProps = {
  required: false,
  label: undefined,
  description: undefined,
  placeholder: undefined,
  hint: undefined,
  format: undefined,
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
  format: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

export default TextInput
