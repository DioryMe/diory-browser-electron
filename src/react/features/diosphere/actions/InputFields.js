import React from 'react'
import PropTypes from 'prop-types'
import { Button, Heading, Pane } from 'evergreen-ui'
import { v4 as uuid } from 'uuid'

import TextInput from '../../../components/TextInput'

const useInputFields = (fields, values = {}, onChange = () => {}) => ({
  inputFields: fields.map((field) => ({
    ...field,
    value: values[field.key],
    onChange: (value) => onChange({ ...values, [field.key]: value }),
  })),
})

const InputFieldsArray = ({ value, label, onChange, ...inputField }) => {
  const valuesArray = value || []
  return (
    <>
      <Pane display="flex" paddingTop={16}>
        <Heading flex={1}>{label}</Heading>
        <Button
          appearance="minimal"
          onClick={() => {
            onChange([...valuesArray, { key: uuid() }])
          }}
        >
          Add new
        </Button>
      </Pane>
      <Pane background="tint2" padding={8}>
        {valuesArray.map((oldValues, index) => (
          <Pane key={oldValues.key} display="flex" alignItems="flex-end">
            <Pane paddingBottom={16}>{index + 1}:</Pane>
            <InputFields
              {...inputField}
              values={oldValues}
              onChange={(newValues) => {
                valuesArray.splice(index, 1, newValues)
                onChange(valuesArray)
              }}
            />
            <Button
              margin={8}
              onClick={() => {
                valuesArray.splice(index, 1)
                onChange(valuesArray)
              }}
            >
              Remove
            </Button>
          </Pane>
        ))}
      </Pane>
    </>
  )
}

InputFieldsArray.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

const InputFields = ({ fields, values, onChange }) => {
  const { inputFields } = useInputFields(fields, values, onChange)

  return (
    <>
      {inputFields.map((inputField) => {
        if (inputField.format === 'array') {
          return <InputFieldsArray key={inputField.key} {...inputField} />
        }
        return <TextInput key={inputField.key} {...inputField} />
      })}
    </>
  )
}

InputFields.defaultProops = {
  values: {},
}

InputFields.propTypes = {
  fields: PropTypes.array.isRequired,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
}

export { InputFields }
