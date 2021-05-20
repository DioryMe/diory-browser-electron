import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { TextInputField } from 'evergreen-ui'

function stringifyValue(value, format) {
  if (!value) {
    return ''
  }

  if (format === 'object') {
    return JSON.stringify(value)
  }

  return value
}

function validateValue(value, format) {
  if (!value) {
    return true
  }

  if (format === 'object') {
    try {
      JSON.parse(value)
    } catch (e) {
      return false
    }
  }

  if (format === 'date') {
    return new Date(value).toString() !== 'Invalid Date'
  }

  if (format === 'latlng') {
    const [lat, lng] = value.split(', ')
    return (
      value.split(', ').length === 2 &&
      parseFloat(lat) &&
      parseFloat(lng) &&
      parseFloat(lat) >= -90 &&
      parseFloat(lat) <= 90 &&
      parseFloat(lng) >= -180 &&
      parseFloat(lng) <= 180 &&
      /^-?\d*\.?\d*$/.test(lat) &&
      /^-?\d*\.?\d*$/.test(lng)
    )
  }

  return true
}

function parseValue(value, format) {
  if (!value) {
    return
  }

  if (format === 'object') {
    return JSON.parse(value)
  }

  return value
}

const useValidation = (initialValue, format) => {
  const [validatedValue, setValue] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)

  useEffect(() => {
    setValue(stringifyValue(initialValue, format))
  }, [initialValue, format])

  return {
    validatedValue,
    validate: (nextValue, onChange) => {
      setValue(nextValue)
      const isValid = validateValue(nextValue, format)
      setIsInvalid(!isValid)
      if (isValid) {
        onChange(parseValue(nextValue, format))
      }
    },
    isInvalid,
  }
}

const TextInput = ({ format, value, onChange, ...props }) => {
  const { validatedValue, validate, isInvalid } = useValidation(value, format)
  return (
    <TextInputField
      value={validatedValue}
      onChange={({ target: { value } }) => validate(value, onChange)}
      isInvalid={isInvalid}
      validationMessage={isInvalid && `Invalid ${format}`}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  onChange: PropTypes.func,
}

export default TextInput
