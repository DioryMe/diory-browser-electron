import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'evergreen-ui'

import { useCreateDiory } from './useCreateDiory'

import Icon from '../../../components/Icon'

const buttonStyles = {
  borderRadius: 0,
  whiteSpace: 'normal',
  lineHeight: 1.2,
}

const CreateDioryButton = ({ text }) => {
  const createDiory = useCreateDiory()
  return (
    <Button
      appearance="primary"
      intent="success"
      iconBefore={<Icon icon="plus" />}
      onClick={() => createDiory({ text })}
      data-testid="add-button"
      {...buttonStyles}
    >
      {text}
    </Button>
  )
}

CreateDioryButton.propTypes = {
  text: PropTypes.string.isRequired,
}

export default CreateDioryButton
