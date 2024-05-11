import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'evergreen-ui'
import { useDispatchActions } from '../../../store'
import { createDiory } from '../../diograph/diographActions'

import Icon from '../../../components/Icon'

const buttonStyles = {
  marginX: 24,
  marginY: 12,
  borderRadius: 0,
  whiteSpace: 'normal',
  lineHeight: 1.2,
}

const CreateDioryButton = ({ text }) => {
  const { dispatch } = useDispatchActions()
  return (
    <Button
      appearance="primary"
      intent="success"
      iconBefore={<Icon icon="plus" />}
      onClick={() => dispatch(createDiory({ text }))}
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
